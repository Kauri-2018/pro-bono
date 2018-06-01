exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('subcategories').del()
    .then(() => {
      // Inserts seed entries
      return knex('subcategories').insert([
        {
          id: 770001,
          name: 'Consumer - credit contracts and repossession',
          category_id: 660001
        },
        {
          id: 770002,
          name: 'Employment',
          category_id: 660001
        },
        {
          id: 770003,
          name: 'Financial - debt, insolvency',
          category_id: 660001
        },
        {
          id: 770004,
          name: 'Tenancy',
          category_id: 660001
        },
        {
          id: 770005,
          name: 'Human Rights',
          category_id: 660001
        },
        {
          id: 770006,
          name: 'Care of children',
          category_id: 660002
        },
        {
          id: 770007,
          name: 'CYFS',
          category_id: 660002
        },
        {
          id: 770008,
          name: 'Domestic violence',
          category_id: 660002
        },
        {
          id: 770009,
          name: 'PPPR',
          category_id: 660002
        },
        {
          id: 7700010,
          name: 'International relocation - urgent border alerts',
          category_id: 660002
        },
        {
          id: 7700011,
          name: 'Education',
          category_id: 660003
        },
        {
          id: 7700012,
          name: 'Board of Trustee hearings',
          category_id: 660003
        },
        {
          id: 7700013,
          name: 'Immigration and refugee',
          category_id: 660003
        },
        {
          id: 7700014,
          name: 'Welfare and social housing',
          category_id: 660003
        },
        {
          id: 7700015,
          name: 'Health and disability provider complaints',
          category_id: 660003
        },
        {
          id: 7700016,
          name: 'Disability Support Services entitlements',
          category_id: 660003
        },
        {
          id: 7700017,
          name: 'Crown Prosecutions - IRD, DOC, MAF',
          category_id: 660004
        },
        {
          id: 7700018,
          name: 'Police Prosecutions',
          category_id: 660004
        },
        {
          id: 7700019,
          name: 'Youth justice',
          category_id: 660004
        },
        {
          id: 7700020,
          name: 'Tenure/Ownership',
          category_id: 660005
        },
        {
          id: 7700021,
          name: 'Waitangi Tribunal',
          category_id: 660005
        }
      ])
    })
}
