import { object as YupObject, string as YupString } from 'yup'
import { DIAGNOSIS_RESULTS } from 'components/molecules/DiagnosticInput'

const { NORMAL } = DIAGNOSIS_RESULTS
const FINDINGS_REQUIRED = 'abnormal findings required'

export const validationSchema = YupObject().shape({
  appearance: YupString(),
  appearance_notes: YupString().when('appearance', {
    is: (appearance) => appearance === NORMAL,
    then: YupString().nullable(),
    otherwise: YupString()
      .nullable()
      .required(`Appearance ${FINDINGS_REQUIRED}`),
  }),
  eyes_ears_nose_throat: YupString(),
  eyes_ears_nose_throat_notes: YupString().when('eyes_ears_nose_throat', {
    is: (eyes_ears_nose_throat) => eyes_ears_nose_throat === NORMAL,
    then: YupString().nullable(),
    otherwise: YupString()
      .nullable()
      .required(`Eyes/Ears/Nose/Throat ${FINDINGS_REQUIRED}`),
  }),
  lymph_nodes: YupString(),
  lymph_nodes_notes: YupString().when('lymph_nodes', {
    is: (lymph_nodes) => lymph_nodes === NORMAL,
    then: YupString().nullable(),
    otherwise: YupString()
      .nullable()
      .required(`Lymph Nodes ${FINDINGS_REQUIRED}`),
  }),
  heart_auscultation_supine_position: YupString(),
  heart_auscultation_supine_position_notes: YupString().when(
    'heart_auscultation_supine_position',
    {
      is: (heart_auscultation_supine_position) =>
        heart_auscultation_supine_position === NORMAL,
      then: YupString().nullable(),
      otherwise: YupString()
        .nullable()
        .required(
          `Heart-Auscultation of the heart the supine position ${FINDINGS_REQUIRED}`
        ),
    }
  ),
  heart_auscultation_standing_position: YupString(),
  heart_auscultation_standing_position_notes: YupString().when(
    'heart_auscultation_standing_position',
    {
      is: (heart_auscultation_standing_position) =>
        heart_auscultation_standing_position === NORMAL,
      then: YupString().nullable(),
      otherwise: YupString()
        .nullable()
        .required(
          `Heart-Auscultation of the heart the standing position ${FINDINGS_REQUIRED}`
        ),
    }
  ),
  heart_lower_pulses: YupString(),
  heart_lower_pulses_notes: YupString().when('heart_lower_pulses', {
    is: (heart_lower_pulses) => heart_lower_pulses === NORMAL,
    then: YupString().nullable(),
    otherwise: YupString()
      .nullable()
      .required(`Heart-Lower extremity pulses ${FINDINGS_REQUIRED}`),
  }),
  pulses: YupString(),
  pulses_notes: YupString().when('pulses', {
    is: (pulses) => pulses === NORMAL,
    then: YupString().nullable(),
    otherwise: YupString().nullable().required(`Pulses ${FINDINGS_REQUIRED}`),
  }),
  lungs: YupString(),
  lungs_notes: YupString().when('lungs', {
    is: (lungs) => lungs === NORMAL,
    then: YupString().nullable(),
    otherwise: YupString().nullable().required(`Lungs ${FINDINGS_REQUIRED}`),
  }),
  abdomen: YupString(),
  abdomen_notes: YupString().when('abdomen', {
    is: (abdomen) => abdomen === NORMAL,
    then: YupString().nullable(),
    otherwise: YupString().nullable().required(`Abdomen ${FINDINGS_REQUIRED}`),
  }),
  skin: YupString(),
  skin_notes: YupString().when('skin', {
    is: (skin) => skin === NORMAL,
    then: YupString().nullable(),
    otherwise: YupString().nullable().required(`Skin ${FINDINGS_REQUIRED}`),
  }),
  marfans_stigmata: YupString(),
  marfans_stigmata_notes: YupString().when('marfans_stigmata', {
    is: (marfans_stigmata) => marfans_stigmata === NORMAL,
    then: YupString().nullable(),
    otherwise: YupString()
      .nullable()
      .required(`Marfan's stigmata ${FINDINGS_REQUIRED}`),
  }),
})
