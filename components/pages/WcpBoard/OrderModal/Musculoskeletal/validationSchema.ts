import { object as YupObject, string as YupString } from 'yup'
import { DIAGNOSIS_RESULTS } from 'components/molecules/DiagnosticInput'

const { NORMAL } = DIAGNOSIS_RESULTS
const FINDINGS_REQUIRED = 'abnormal findings required'

export const validationSchema = YupObject().shape({
  neck: YupString(),
  neck_notes: YupString().when('neck', {
    is: (neck) => neck === NORMAL,
    then: YupString().nullable(),
    otherwise: YupString().nullable().required(`Neck ${FINDINGS_REQUIRED}`),
  }),
  back: YupString(),
  back_notes: YupString().when('back', {
    is: (back) => back === NORMAL,
    then: YupString().nullable(),
    otherwise: YupString().nullable().required(`Back ${FINDINGS_REQUIRED}`),
  }),
  shoulder_or_arm: YupString(),
  shoulder_or_arm_notes: YupString().when('shoulder_or_arm', {
    is: (shoulder_or_arm) => shoulder_or_arm === NORMAL,
    then: YupString().nullable(),
    otherwise: YupString()
      .nullable()
      .required(`Shoulder/Arm ${FINDINGS_REQUIRED}`),
  }),
  elbow_or_forearm: YupString(),
  elbow_or_forearm_notes: YupString().when('elbow_or_forearm', {
    is: (elbow_or_forearm) => elbow_or_forearm === NORMAL,
    then: YupString().nullable(),
    otherwise: YupString()
      .nullable()
      .required(`Elbow/Forearm ${FINDINGS_REQUIRED}`),
  }),
  wrist_or_hand: YupString(),
  wrist_or_hand_notes: YupString().when('wrist_or_hand', {
    is: (wrist_or_hand) => wrist_or_hand === NORMAL,
    then: YupString().nullable(),
    otherwise: YupString()
      .nullable()
      .required(`Wrist/Hand ${FINDINGS_REQUIRED}`),
  }),
  hip_or_thigh: YupString(),
  hip_or_thigh_notes: YupString().when('hip_or_thigh', {
    is: (hip_or_thigh) => hip_or_thigh === NORMAL,
    then: YupString().nullable(),
    otherwise: YupString()
      .nullable()
      .required(`Hip/Thigh ${FINDINGS_REQUIRED}`),
  }),
  knee: YupString(),
  knee_notes: YupString().when('knee', {
    is: (knee) => knee === NORMAL,
    then: YupString().nullable(),
    otherwise: YupString().nullable().required(`Knee ${FINDINGS_REQUIRED}`),
  }),
  leg_or_ankle: YupString(),
  leg_or_ankle_notes: YupString().when('leg_or_ankle', {
    is: (leg_or_ankle) => leg_or_ankle === NORMAL,
    then: YupString().nullable(),
    otherwise: YupString()
      .nullable()
      .required(`Leg/Ankle ${FINDINGS_REQUIRED}`),
  }),
  foot: YupString(),
  foot_notes: YupString().when('foot', {
    is: (foot) => foot === NORMAL,
    then: YupString().nullable(),
    otherwise: YupString().nullable().required(`Foot ${FINDINGS_REQUIRED}`),
  }),
})
