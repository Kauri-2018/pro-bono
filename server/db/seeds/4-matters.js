const {categories, subcategory, titles, details, emails} = require('../case-studies-data/case-studies')

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  const randomMatters = generateMatters(10)
  return knex('matters').del()
    .then(() => {
      // Inserts seed entries
      return knex('matters').insert([
        {
          id: 550001,
          category: 'Civil',
          subcategories: '["Employment"]',
          details: `Meowwww. Sit and stare paw at beetle and eat it before it gets away. Poop in the plant pot love to play with owner's hair tie for find a way to fit in tiny box or drink water out of the faucet. Roll over and sun my belly sun bathe, so sleep on keyboard, but kitty ipsum dolor sit amet, shed everywhere shed everywhere stretching attack your ankles chase the red dot, hairball run catnip eat the grass sniff sleep everywhere, but not in my bed and show belly ask for petting. Proudly present butt to human spill litter box, scratch at owner, destroy all furniture, especially couch play riveting piece on synthesizer keyboard so claws in your leg. Missing until dinner time eat prawns daintily with a claw then lick paws clean wash down prawns with a lap of carnation milk then retire to the warmest spot on the couch to claw at the fabric before taking a catnap the fat cat sat on the mat bat away with paws. Annoy kitten brother with poking throw down all the stuff in the kitchen. Sit in window and stare oooh, a bird, yum. Scratch at fleas, meow until belly rubs,`,
          contact_email: 'test-contact_email',
          is_complete: true,
          claimed_by: 440003,
          centre_id: 110001,
          title: 'Civil Cat',
          internal_matter_number: 1354687
        },
        {
          id: 550002,
          category: 'Family',
          subcategories: '["Care of children", "Domestic violence"]',
          details: `hide behind curtain when vacuum cleaner is on scratch strangers and poo on owners food jump launch to pounce upon little yarn mouse, bare fangs at toy run hide in litter box until treats are fed allways wanting food or use lap as chair, Gate keepers of hell sit in a box for hours a nice warm laptop for me to sit on. Push your water glass on the floor love and fish i must find my red catnip fishy fish and meowzer. Have secret plans make muffins, yet lick human with sandpaper tongue so kitty ipsum dolor sit amet, shed everywhere shed everywhere stretching attack your ankles chase the red dot, hairball run catnip eat the grass sniff`,
          contact_email: 'test-contact_email',
          is_complete: false,
          claimed_by: 440003,
          centre_id: 110001,
          title: 'Family Cat',
          internal_matter_number: 1326234
        },
        {
          id: 550003,
          category: 'Administrative',
          subcategories: '["Immigration"]',
          details: `hide behind curtain when vacuum cleaner is on scratch strangers and poo on owners food jump launch to pounce upon little yarn mouse, bare fangs at toy run hide in litter box until treats are fed allways wanting food or use lap as chair, Gate keepers of hell sit in a box for hours a nice warm laptop for me to sit on. Push your water glass on the floor love and fish i must find my red catnip fishy fish and meowzer. Have secret plans make muffins, yet lick human with sandpaper tongue so kitty ipsum dolor sit amet, shed everywhere shed everywhere stretching attack your ankles chase the red dot, hairball run catnip eat the grass sniff`,
          contact_email: 'test-contact_email',
          is_complete: false,
          claimed_by: null,
          centre_id: 110001,
          title: 'Admin Cat',
          internal_matter_number: 3478486
        },
        {
          id: 550004,
          category: 'Criminal',
          subcategories: '[]',
          details: `hide behind curtain when vacuum cleaner is on scratch strangers and poo on owners food jump launch to pounce upon little yarn mouse, bare fangs at toy run hide in litter box until treats are fed allways wanting food or use lap as chair, Gate keepers of hell sit in a box for hours a nice warm laptop for me to sit on. Push your water glass on the floor love and fish i must find my red catnip fishy fish and meowzer. Have secret plans make muffins, yet lick human with sandpaper tongue so kitty ipsum dolor sit amet, shed everywhere shed everywhere stretching attack your ankles chase the red dot, hairball run catnip eat the grass sniff`,
          contact_email: 'test-contact_email',
          is_complete: false,
          claimed_by: null,
          centre_id: 110001,
          title: 'Criminal Cat',
          internal_matter_number: 9874
        },
        {
          id: 550005,
          category: 'Māori',
          subcategories: '["Fisheries"]',
          details: `hide behind curtain when vacuum cleaner is on scratch strangers and poo on owners food jump launch to pounce upon little yarn mouse, bare fangs at toy run hide in litter box until treats are fed allways wanting food or use lap as chair, Gate keepers of hell sit in a box for hours a nice warm laptop for me to sit on. Push your water glass on the floor love and fish i must find my red catnip fishy fish and meowzer. Have secret plans make muffins, yet lick human with sandpaper tongue so kitty ipsum dolor sit amet, shed everywhere shed everywhere stretching attack your ankles chase the red dot, hairball run catnip eat the grass sniff`,
          contact_email: 'test-contact_email',
          is_complete: false,
          claimed_by: 440003,
          centre_id: 110001,
          title: 'Māori Cat',
          internal_matter_number: 1353274
        },
        {
          id: 550006,
          category: 'Criminal',
          subcategories: '[]',
          details: `hide behind curtain when vacuum cleaner is on scratch strangers and poo on owners food jump launch to pounce upon little yarn mouse, bare fangs at toy run hide in litter box until treats are fed allways wanting food or use lap as chair, Gate keepers of hell sit in a box for hours a nice warm laptop for me to sit on. Push your water glass on the floor love and fish i must find my red catnip fishy fish and meowzer. Have secret plans make muffins, yet lick human with sandpaper tongue so kitty ipsum dolor sit amet, shed everywhere shed everywhere stretching attack your ankles chase the red dot, hairball run catnip eat the grass sniff`,
          contact_email: 'test-contact_email',
          is_complete: false,
          claimed_by: null,
          centre_id: 110001,
          title: 'Another Criminal Cat',
          internal_matter_number: 816435
        },
        ...randomMatters
      ])
    })
}

function generateMatters (numMatters) {
  const matterArray = []

  for (let i = 0; i < numMatters; i++) {
    const title = titles[Math.floor(Math.random() * titles.length)]
    const category = categories[Math.floor(Math.random() * categories.length)]
    const subcategories = [subcategory[Math.floor(Math.random() * subcategory.length)]]
    const additionalDetails = details[Math.floor(Math.random() * details.length)]
    const contactEmail = emails[Math.floor(Math.random() * emails.length)]
    const centreId = 110001// + Math.floor(Math.random() * 23)
    const internalMatterNumber = 1000 + Math.floor(Math.random() * 100000)
    matterArray.push({title,
      category,
      subcategories: JSON.stringify(subcategories),
      details: additionalDetails,
      centre_id: centreId,
      contact_email: contactEmail,
      internal_matter_number: internalMatterNumber,
      is_complete: false
    })
  }
  return matterArray
}
