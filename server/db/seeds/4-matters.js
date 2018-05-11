exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('matters').del()
    .then(() => {
      // Inserts seed entries
      return knex('matters').insert([
        {
          id: 550001,
          category: 'Civil',
          details: `Meowwww. Sit and stare paw at beetle and eat it before it gets away. Poop in the plant pot love to play with owner's hair tie for find a way to fit in tiny box or drink water out of the faucet. Roll over and sun my belly sun bathe, so sleep on keyboard, but kitty ipsum dolor sit amet, shed everywhere shed everywhere stretching attack your ankles chase the red dot, hairball run catnip eat the grass sniff sleep everywhere, but not in my bed and show belly ask for petting. Proudly present butt to human spill litter box, scratch at owner, destroy all furniture, especially couch play riveting piece on synthesizer keyboard so claws in your leg. Missing until dinner time eat prawns daintily with a claw then lick paws clean wash down prawns with a lap of carnation milk then retire to the warmest spot on the couch to claw at the fabric before taking a catnap the fat cat sat on the mat bat away with paws. Annoy kitten brother with poking throw down all the stuff in the kitchen. Sit in window and stare oooh, a bird, yum. Scratch at fleas, meow until belly rubs,`,
          contact_email: 'test-contact_email',
          is_complete: false,
          claimed_by: 440001,
          centre_id: 1,
          title: 'name',
          internal_matter_number: 13546874860
        },
        {
          category: 'Family',
          details: `hide behind curtain when vacuum cleaner is on scratch strangers and poo on owners food jump launch to pounce upon little yarn mouse, bare fangs at toy run hide in litter box until treats are fed allways wanting food or use lap as chair, Gate keepers of hell sit in a box for hours a nice warm laptop for me to sit on. Push your water glass on the floor love and fish i must find my red catnip fishy fish and meowzer. Have secret plans make muffins, yet lick human with sandpaper tongue so kitty ipsum dolor sit amet, shed everywhere shed everywhere stretching attack your ankles chase the red dot, hairball run catnip eat the grass sniff`,
          contact_email: 'test-contact_email',
          is_complete: false,
          claimed_by: 440002,
          centre_id: 1,
          title: 'name',
          internal_matter_number: 13546874860
        },
        {
          category: 'Administrative',
          details: `hide behind curtain when vacuum cleaner is on scratch strangers and poo on owners food jump launch to pounce upon little yarn mouse, bare fangs at toy run hide in litter box until treats are fed allways wanting food or use lap as chair, Gate keepers of hell sit in a box for hours a nice warm laptop for me to sit on. Push your water glass on the floor love and fish i must find my red catnip fishy fish and meowzer. Have secret plans make muffins, yet lick human with sandpaper tongue so kitty ipsum dolor sit amet, shed everywhere shed everywhere stretching attack your ankles chase the red dot, hairball run catnip eat the grass sniff`,
          contact_email: 'test-contact_email',
          is_complete: false,
          claimed_by: 440003,
          centre_id: 1,
          title: 'name',
          internal_matter_number: 13546874860
        },
        {
          category: 'Criminal',
          details: `hide behind curtain when vacuum cleaner is on scratch strangers and poo on owners food jump launch to pounce upon little yarn mouse, bare fangs at toy run hide in litter box until treats are fed allways wanting food or use lap as chair, Gate keepers of hell sit in a box for hours a nice warm laptop for me to sit on. Push your water glass on the floor love and fish i must find my red catnip fishy fish and meowzer. Have secret plans make muffins, yet lick human with sandpaper tongue so kitty ipsum dolor sit amet, shed everywhere shed everywhere stretching attack your ankles chase the red dot, hairball run catnip eat the grass sniff`,
          contact_email: 'test-contact_email',
          is_complete: false,
          claimed_by: 0,
          centre_id: 1,
          title: 'name',
          internal_matter_number: 13546874860
        },
        {
          category: 'Maori',
          details: `hide behind curtain when vacuum cleaner is on scratch strangers and poo on owners food jump launch to pounce upon little yarn mouse, bare fangs at toy run hide in litter box until treats are fed allways wanting food or use lap as chair, Gate keepers of hell sit in a box for hours a nice warm laptop for me to sit on. Push your water glass on the floor love and fish i must find my red catnip fishy fish and meowzer. Have secret plans make muffins, yet lick human with sandpaper tongue so kitty ipsum dolor sit amet, shed everywhere shed everywhere stretching attack your ankles chase the red dot, hairball run catnip eat the grass sniff`,
          contact_email: 'test-contact_email',
          is_complete: false,
          claimed_by: 0,
          centre_id: 1,
          title: 'name',
          internal_matter_number: 13546874860
        },
        {
          category: 'Specialist Services',
          details: `hide behind curtain when vacuum cleaner is on scratch strangers and poo on owners food jump launch to pounce upon little yarn mouse, bare fangs at toy run hide in litter box until treats are fed allways wanting food or use lap as chair, Gate keepers of hell sit in a box for hours a nice warm laptop for me to sit on. Push your water glass on the floor love and fish i must find my red catnip fishy fish and meowzer. Have secret plans make muffins, yet lick human with sandpaper tongue so kitty ipsum dolor sit amet, shed everywhere shed everywhere stretching attack your ankles chase the red dot, hairball run catnip eat the grass sniff`,
          contact_email: 'test-contact_email',
          is_complete: false,
          claimed_by: 0,
          centre_id: 1,
          title: 'name',
          internal_matter_number: 13546874860
        }
      ])
    })
}
