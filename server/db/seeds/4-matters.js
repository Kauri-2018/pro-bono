// const {categories, subcategory, titles, details, emails} = require('../case-studies-data/case-studies')

exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  // const randomMatters = generateMatters(10)
  return knex('matters').del()
    .then(() => {
      // Inserts seed entries
      return knex('matters').insert([
        {
          id: 550001,
          category_id: 660001,
          subcategories: '["Employment"]',
          details: `The Employment Relations Authority (ERA) found Wallboard and Insulation Supplies NZ (WIS) unjustifiably dismissed Lefiu Matthew Naoupu, known as Matty. The authority ordered the company to pay Naoupu $9600 in compensation, plus three months' wages, minus 20 per cent, after his September 2016 dismissal.`,
          contact_email: 'joel.jones@aclc.co.nz',
          is_complete: true,
          claimed_by: 440003,
          centre_id: 110001,
          title: 'Unfair dismissal',
          internal_matter_number: 1354687,
          work_remote: true,
          time_commitment: '0-2'
        },
        {
          id: 550002,
          category_id: 660002,
          subcategories: '["Care of children", "Domestic violence"]',
          details: `Past approaches to measuring the safety of children and young people relied on findings of maltreatment, but new research that the Ministry for Vulnerable Children Oranga Tamariki and the Office of the Chief Social Worker produced jointly took what the ministry called a  "zero-tolerance" approach to apply a broader definition of harm.`,
          contact_email: 'raine.reynolds@aclc.co.nz',
          is_complete: false,
          claimed_by: 440003,
          centre_id: 110001,
          title: 'Care of children upon separation',
          internal_matter_number: 1326234,
          work_remote: false,
          time_commitment: '2-5'
        },
        {
          id: 550003,
          category_id: 660003,
          subcategories: '["Immigration and refugee"]',
          details: `To live in New Zealand permanently, you need a resident visa. There are a number of pathways to obtaining a resident visa, many of which start with a temporary visa allowing you to work, study or own a business in New Zealand. Some visas, such as those granted under the Skilled Migrant Category, grant you residence right away. You need to comply with any conditions attached to your visa, to ensure your pathway to residence is not interrupted.`,
          contact_email: 'robyn.rice@aclc.co.nz',
          is_complete: false,
          claimed_by: null,
          centre_id: 110001,
          title: 'Appliction for residency',
          internal_matter_number: 3478486,
          work_remote: true,
          time_commitment: '5-10'
        },
        {
          id: 550004,
          category_id: 660004,
          subcategories: '[]',
          details: `The crime or act of willfully interfering with the process of justice and law especially by influencing, threatening, harming, or impeding a witness, potential witness, juror, or judicial or legal officer or by furnishing false information in or otherwise impeding an investigation or legal process.`,
          contact_email: 'andrew.adams@aclc.co.nz',
          is_complete: false,
          claimed_by: null,
          centre_id: 110001,
          title: 'Obstruction of justice',
          internal_matter_number: 9874,
          work_remote: false,
          time_commitment: '10-15'
        },
        {
          id: 550005,
          category_id: 660005,
          subcategories: '["Tenure/Ownership"]',
          details: `The Government made the payments on December 15 without any public announcement, but they were discovered by Stuff and confirmed by the Office of Treaty Settlements this week. The payments were made because of "relativity" clauses the tribes negotiated during the "fiscal envelope" settlement process in the mid-1990s.`,
          contact_email: 'peter.piper@aclc.co.nz',
          is_complete: false,
          claimed_by: 440003,
          centre_id: 110001,
          title: 'Land settlement',
          internal_matter_number: 1353274,
          work_remote: true,
          time_commitment: '30+'
        },
        {
          id: 550006,
          category_id: 660004,
          subcategories: '[]',
          details: `A 28-year-old man of no fixed abode is set to appear in the Timaru District Court on Thursday on a raft of charges, which police say span the length of the South Island, including Greymouth where the Toyota Hilux ute was reported stolen on May 6.`,
          contact_email: 'pam.pepper@aclc.co.nz',
          is_complete: false,
          claimed_by: null,
          centre_id: 110001,
          title: 'Mt Eden theft',
          internal_matter_number: 816435,
          work_remote: true,
          time_commitment: '20-30'
        }
        // ...randomMatters
      ])
    })
}

// function generateMatters (numMatters) {
//   const matterArray = []

//   for (let i = 0; i < numMatters; i++) {
//     const numSubcategories = Math.floor(Math.random() * 4)
//     const subcategories = []
//     const title = titles[Math.floor(Math.random() * titles.length)]
//     const category = categories[Math.floor(Math.random() * categories.length)]
//     for (let i = 0; i < numSubcategories; i++) {
//       const newSubcategory = subcategory[Math.floor(Math.random() * subcategory.length)]
//       if (subcategories.includes(newSubcategory)) {
//         i--
//         continue
//       }
//       subcategories.push(newSubcategory)
//     }
//     const additionalDetails = details[Math.floor(Math.random() * details.length)]
//     const contactEmail = emails[Math.floor(Math.random() * emails.length)]
//     const centreId = 110001// + Math.floor(Math.random() * 23)
//     const internalMatterNumber = 1000 + Math.floor(Math.random() * 100000)
//     matterArray.push({title,
//       category,
//       subcategories: JSON.stringify(subcategories),
//       details: additionalDetails,
//       centre_id: centreId,
//       contact_email: contactEmail,
//       internal_matter_number: internalMatterNumber,
//       is_complete: false
//     })
//   }
//   return matterArray
// }
