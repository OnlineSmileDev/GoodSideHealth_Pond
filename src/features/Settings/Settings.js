import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query'
import { Row, Col, Container } from 'react-bootstrap'
import {
  Notification,
  NOTIFICATION_VARIANT,
} from 'components/atoms/Notification'
import UserInformation from './UserInformation'
import UpdatePassword from './UpdatePassword'
import SettingsSkeleton from '../Skeleton/SettingsSkeleton'

const Settings = () => {
  const userQuery = useQuery('/api/users/1') // TODO: This really shouldn't be "user 1"...
  const locationsQuery = useQuery('/api/locations')
  const { DANGER, SUCCESS } = NOTIFICATION_VARIANT

  const [notifyToggle, setNotifyToggle] = useState({
    show: false,
    isError: false,
    text: '',
  })

  useEffect(() => {
    if (notifyToggle.show) {
      setTimeout(() => {
        setNotifyToggle({ show: false, isError: false, text: '' })
      }, 3000)
    }
  }, [notifyToggle])

  return (
    <Container fluid className='py-25'>
      {notifyToggle.show && (
        <Notification
          message={notifyToggle.text}
          variant={notifyToggle.isError ? DANGER : SUCCESS}
        />
      )}
      {!userQuery.data || !locationsQuery.data ? (
        <SettingsSkeleton />
      ) : (
        <Row className='py-25'>
          <Col md={6}>
            <UserInformation
              setNotifyToggle={setNotifyToggle}
              notifyToggle={notifyToggle}
              refetch={userQuery.refetch}
              user={userQuery.data}
              locations={locationsQuery.data}
            />
          </Col>
          <Col md={6}>
            <UpdatePassword
              setNotifyToggle={setNotifyToggle}
              notifyToggle={notifyToggle}
              user={userQuery.data}
            />
          </Col>
        </Row>
      )}
    </Container>
  )
}
export default Settings
