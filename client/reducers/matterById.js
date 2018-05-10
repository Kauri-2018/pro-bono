import {SHOW_MATTER_BY_ID} from '../actions/matters'

const initialMatterById = {
  category: 'Family',
  details: `hide behind curtain when vacuum cleaner is on scratch strangers and poo on owners food jump launch to pounce upon little yarn mouse, bare fangs at toy run hide in litter box until treats are fed allways wanting food or use lap as chair, Gate keepers of hell sit in a box for hours a nice warm laptop for me to sit on. Push your water glass on the floor love and fish i must find my red catnip fishy fish and meowzer. Have secret plans make muffins, yet lick human with sandpaper tongue so kitty ipsum dolor sit amet, shed everywhere shed everywhere stretching attack your ankles chase the red dot, hairball run catnip eat the grass sniff`,
  contactEmail: 'test-contact_email',
  isComplete: false,
  claimbedBy: 440002,
  centreId: 1,
  title: 'name',
  internalMatterNumber: 13546874860
}

export default function (matterById = initialMatterById, action) {
  switch (action.type) {
    case SHOW_MATTER_BY_ID:
      return action.matterById.matter

    default:
      return matterById
  }
}
