import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { Form } from 'react-bootstrap'
import { useQuery } from 'react-query'
import { useFeatures } from 'flagged'
import { sendRegistrationInvitation } from 'src/features/Patients/patients.asyncActions'
import { Pagination } from 'components/molecules/Pagination'
import { Button, BUTTON_VARIANT } from 'components/atoms/Button'
import { ShareRegistrationLink } from 'components/molecules/ShareRegistrationLink'
import { getPhoneNumberInE164Format } from 'utils/phoneNumber/getPhoneNumberInE164Format'
import { Modal } from 'components/organisms/Modal'
import { useDebounce } from 'src/hooks'
import { DEBOUNCE_TIMEOUT } from 'constants/general'
import { VISITS_STATUS, VISIT_TYPE, VISIT_REASON } from 'constants/visits'
import { ORDER_STATUS } from 'constants/orders'
import { FORM_TYPES } from 'constants/forms'
import { PatientList } from 'components/molecules/PatientList'
import { Page } from 'components/templates/Page'
import { createFilterString } from 'utils/createFilterString'
import { getAgeFromDateOfBirth } from 'utils/getAgeFromDateOfBirth'
import { selectUserDetails } from 'src/features/Users/users.selectors'
import {
  useCreateWcpVisitsMutation,
  useGetSessionPatientsQuery,
  useGetPatientFormsQuery,
  useSessionStationsQuery,
  useGetOrganizationsQuery,
} from 'graphql/.generated'
import { EmptyPatients } from './EmptyPatients'
import { SHARE_METHOD } from 'constants/invitations'

const ELLIPSES_AFTER = 2
const { SMS } = SHARE_METHOD

type PatientCountType = {
  data: {
    count?: number
  }
}

type OrganizationType = {
  id: number
  name: string
  slug: string
}

type OrganizationsResType = {
  data: {
    organizations: OrganizationType[]
  }
}

const createOrdersForVisit = (patient) => {
  const MENTAL_HEALTH_PROGRAM = 7
  const MINIMUM_AGE_PHQ_ELIGIBITY = 11

  const { dateOfBirth, programs } = patient
  const hasConsentToMentalHealth = programs?.find(
    ({ id, isActive }) => id === MENTAL_HEALTH_PROGRAM && isActive
  )
  const isOfEligibleAge =
    getAgeFromDateOfBirth(dateOfBirth) >= MINIMUM_AGE_PHQ_ELIGIBITY

  const isPHQEligible = hasConsentToMentalHealth && isOfEligibleAge

  const orderList: Array<{}> = [
    {
      status: ORDER_STATUS.INCOMPLETE,
      order_height_and_weight: { data: {} },
      order_type_id: 1,
    },
    {
      status: ORDER_STATUS.INCOMPLETE,
      order_vision: { data: {} },
      order_type_id: 2,
    },
    {
      status: ORDER_STATUS.INCOMPLETE,
      order_musculoskeletal: { data: {} },
      order_type_id: 3,
    },
    {
      status: ORDER_STATUS.INCOMPLETE,
      order_medical_assessment: { data: {} },
      order_type_id: 4,
    },
    {
      // Tobacco Screener -> Data in Forms
      status: ORDER_STATUS.INCOMPLETE,
      order_type_id: 6,
    },
    {
      // Provider Documentation -> Data in Forms
      status: ORDER_STATUS.INCOMPLETE,
      order_type_id: 7,
    },
    {
      // Covid screener -> Date in Forms
      status: ORDER_STATUS.INCOMPLETE,
      order_type_id: 8,
    },
    {
      // Med History screener -> Date in Forms
      status: ORDER_STATUS.INCOMPLETE,
      order_type_id: 9,
    },
  ]

  if (isPHQEligible)
    orderList.push({
      // PHQ Screener -> Data in Forms
      status: ORDER_STATUS.INCOMPLETE,
      order_type_id: 5,
    })

  return { data: orderList }
}

export const PatientManagement = () => {
  const dispatch = useDispatch()
  const { wcpRegistrationLink } = useFeatures()
  // TODO Find non-redux way to store user (maybe local storage like in registration)
  const { organizationId } = useSelector(selectUserDetails)
  const [page, setPage] = useState(1)
  const [selectedPatients, setSelectedPatients] = useState([])
  const [ineligiblePatients, setIneligiblePatients] = useState([])
  const [registeredPatients, setRegisteredPatients] = useState([])
  const [firstStation, setFirstStation] = useState(null)
  const [secondStation, setSecondStation] = useState(null)
  const [isShareRegLinkModalOpen, setIsShareRegLinkModalOpen] = useState(false)
  // const [nonSelectablePatients, setNonSelectablePatients] = useState([])

  type PatientFilterType = {
    extend?: string
    organizationId?: number
    limit?: number
    search?: string
  }

  const [filters, setSearchFilters] = useState<PatientFilterType>({
    extend: 'programs',
    organizationId,
    limit: 8,
  })

  const debounce = useDebounce()
  const router = useRouter()
  const sessionId = +router.query.id

  // TODO There is a lot of logic happening in a UI component that needs to be abstrated
  // Lines 29 - 103
  const { data: sessionPatients } = useGetSessionPatientsQuery({
    session_id: sessionId,
  })

  useEffect(() => {
    if (sessionPatients) {
      const patientsInSession = sessionPatients?.sessions_by_pk.visits.map(
        (visit) => visit.patient_id
      )
      setIneligiblePatients(patientsInSession)
    }
  }, [sessionPatients])

  const useGetPatients = (page: number, filters) => {
    const queryParams = createFilterString(filters)
    return useQuery(`/api/patients?page=${page}&${queryParams}`)
  }

  const useGetPatientsCount = (filters: PatientFilterType) => {
    const { limit, ...restFilters } = filters
    const queryParams = createFilterString(restFilters)
    return useQuery(`/api/patients/count?${queryParams}`)
  }

  const { data: organizationsResData }: OrganizationsResType =
    useGetOrganizationsQuery()
  const organizations = organizationsResData?.organizations

  const { data: patientsCountRes }: PatientCountType =
    useGetPatientsCount(filters)

  const { data: patientList, isFetching: isFetchingPatientList } =
    useGetPatients(page, filters)

  const selectedPatientIds = selectedPatients.map((patient) => patient.id)

  const { data: patientForms, isFetching: isFetchingPatientForms } =
    useGetPatientFormsQuery({
      ids: selectedPatientIds,
    })

  const handleSearch = (e) => {
    const search = e?.target?.value

    setPage(1)
    debounce(
      () =>
        setSearchFilters({
          ...filters,
          search,
        }),
      DEBOUNCE_TIMEOUT
    )
  }

  const { data: sessionStations } = useSessionStationsQuery({
    session_id: sessionId,
  })

  useEffect(() => {
    if (sessionStations) {
      const {
        sessions_by_pk: { stations },
      } = sessionStations
      //TODO: Is it better to use explicit order, or is this better to express as a "type" of station?
      setFirstStation(stations[0])
      setSecondStation(stations[1])
    }
  }, [sessionStations])

  useEffect(() => {
    if (patientForms) {
      const patientsByFormType: { [key: string]: string[] } =
        patientForms.forms.reduce((acc, form) => {
          const { type, patient_id } = form
          if (!acc[patient_id]) {
            acc[patient_id] = []
          }
          acc[patient_id].push(type)
          return acc
        }, {})

      const registered = Object.entries(patientsByFormType)
        .filter(
          ([, value]) =>
            value.includes(FORM_TYPES.MEDICAL_HISTORY) &&
            value.includes(FORM_TYPES.COVID)
        )
        .map(([key]) => key)

      setRegisteredPatients(registered)
    }
  }, [patientForms])

  // Should have a blocking state
  const { mutate: createVisits, isLoading: isCreatingVisits } =
    useCreateWcpVisitsMutation()

  const handleCreateVisits = () => {
    const input = selectedPatients.map((patient) => {
      const station_id = registeredPatients.includes(patient.id)
        ? secondStation.id
        : firstStation.id
      return {
        station_visit: { data: { station_id } },
        first_name: patient.firstName,
        last_name: patient.lastName,
        date_of_birth: patient.dateOfBirth,
        birth_sex: patient.birthSex,
        patient_id: patient.id,
        // TODO Pull location id off session or patient?
        location_id: patient.locationId,
        session_id: sessionId,
        organization_id: patient.organizationId,
        visit_reason: VISIT_REASON.WCP,
        visit_type_id: VISIT_TYPE.WCP,
        status: VISITS_STATUS.IN_PROGRESS,
        orders: createOrdersForVisit(patient),
      }
    })
    createVisits(
      { input },
      {
        onSuccess: () => {
          router.push(`/session/${sessionId}`)
        },
      }
    )
  }

  const isReady =
    firstStation &&
    secondStation &&
    !isFetchingPatientForms &&
    !isFetchingPatientList

  const shareRegLinkFormInitialValues = {
    recipientName: '',
    shareMethod: SMS,
    district: '',
    phoneNumber: '',
    emailAddress: '',
  }

  const districtOptions =
    organizations?.map(({ name, slug: value }) => ({
      name,
      value,
    })) || []

  const handleShareRegLinkSubmission = (regFormInfo) => {
    const { emailAddress, phoneNumber, shareMethod, recipientName, district } =
      regFormInfo

    const invitation = {
      type: shareMethod,
      name: recipientName,
      district,
      invitee:
        shareMethod === SMS
          ? getPhoneNumberInE164Format(phoneNumber)
          : emailAddress,
    }

    // Todo:Need to use Graphql for sending Invitation
    // @ts-ignore
    dispatch(sendRegistrationInvitation({ invitation })).then(() =>
      setIsShareRegLinkModalOpen(false)
    )
  }

  return (
    <Page>
      <Modal
        onClose={() => setIsShareRegLinkModalOpen(false)}
        subtitle='Share Registration link'
        isOpen={isShareRegLinkModalOpen}
      >
        <ShareRegistrationLink
          formValues={shareRegLinkFormInitialValues}
          setFormValues={handleShareRegLinkSubmission}
          reset={() => setIsShareRegLinkModalOpen(false)}
          districtOptions={districtOptions}
        />
      </Modal>
      <div className='tw-bg-white'>
        <div className='tw-py-5'>
          <div className='tw-px-1'>
            <div className='tw-flex tw-mb-7.5'>
              <p className='tw-text-sm'>Search and select patient(s) below.</p>

              {wcpRegistrationLink && (
                <Button
                  variant={BUTTON_VARIANT.LIGHT}
                  className='tw-ml-auto tw-w-48'
                  onClick={() => setIsShareRegLinkModalOpen(true)}
                >
                  Send Registration Link
                </Button>
              )}

              <Button
                variant={BUTTON_VARIANT.PRIMARY}
                className='tw-w-48 tw-mt-3.5 sm:tw-ml-3.5 sm:tw-w-37.5 sm:tw-mt-0'
                onClick={() => router.push(`/session/${sessionId}`)}
              >
                Return to Session
              </Button>
            </div>

            <Form.Group className='tw-mb-7.5 lg-0 '>
              <Form.Control
                disabled={isCreatingVisits}
                className='search-control'
                type='text'
                placeholder='Search by Name, DOB  or ID'
                onChange={handleSearch}
              />
            </Form.Group>
          </div>

          {isFetchingPatientList ? (
            <PatientList.Skeleton columns={4} canRequestVisit={false} />
          ) : patientList ? (
            <PatientList
              patients={patientList}
              selectedPatients={selectedPatients}
              nonSelectable={ineligiblePatients}
              setSelectedPatients={(value) => {
                setSelectedPatients(value)
              }}
            />
          ) : (
            <EmptyPatients />
          )}
        </div>

        <div className='tw-pb-5 tw-flex tw-justify-between tw-items-center'>
          <Pagination
            recordsPerPage={filters.limit}
            totalSize={patientsCountRes?.count}
            currentPage={page}
            ellipses={ELLIPSES_AFTER}
            paginate={(value) => setPage(value)}
          />
          {/* Add loading state handler to disable button */}
          <Button
            variant={BUTTON_VARIANT.PRIMARY}
            className='tw-ml-auto tw-w-48 tw-mr-5'
            onClick={handleCreateVisits}
            disabled={!isReady}
            isLoading={isCreatingVisits}
          >
            Add Patients to Session
          </Button>
        </div>
      </div>
    </Page>
  )
}
