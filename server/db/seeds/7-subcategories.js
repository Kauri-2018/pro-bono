exports.seed = (knex, Promise) => {
  // Deletes ALL existing entries
  return knex('subcategories').del()
    .then(() => {
      // Inserts seed entries
      return knex('subcategories').insert([
        {
          id: 770001,
          subcategory_name: 'Consumer - credit contracts and repossession',
          category_id: 660001
        },
        {
          id: 770002,
          subcategory_name: 'Employment',
          category_id: 660001
        },
        {
          id: 770003,
          subcategory_name: 'Financial - debt, insolvency',
          category_id: 660001
        },
        {
          id: 770004,
          subcategory_name: 'Tenancy',
          category_id: 660001
        },
        {
          id: 770005,
          subcategory_name: 'Human Rights',
          category_id: 660001
        },
        {
          id: 770006,
          subcategory_name: 'Care of children',
          category_id: 660002
        },
        {
          id: 770007,
          subcategory_name: 'CYFS',
          category_id: 660002
        },
        {
          id: 770008,
          subcategory_name: 'Domestic violence',
          category_id: 660002
        },
        {
          id: 770009,
          subcategory_name: 'PPPR',
          category_id: 660002
        },
        {
          id: 7700010,
          subcategory_name: 'International relocation - urgent border alerts',
          category_id: 660002
        },
        {
          id: 7700011,
          subcategory_name: 'Education',
          category_id: 660003
        },
        {
          id: 7700012,
          subcategory_name: 'Board of Trustee hearings',
          category_id: 660003
        },
        {
          id: 7700013,
          subcategory_name: 'Immigration and refugee',
          category_id: 660003
        },
        {
          id: 7700014,
          subcategory_name: 'Welfare and social housing',
          category_id: 660003
        },
        {
          id: 7700015,
          subcategory_name: 'Health and disability provider complaints',
          category_id: 660003
        },
        {
          id: 7700016,
          subcategory_name: 'Disability Support Services entitlements',
          category_id: 660003
        },
        {
          id: 7700017,
          subcategory_name: 'Crown Prosecutions - IRD, DOC, MAF',
          category_id: 660004
        },
        {
          id: 7700018,
          subcategory_name: 'Police Prosecutions',
          category_id: 660004
        },
        {
          id: 7700019,
          subcategory_name: 'Youth justice',
          category_id: 660004
        },
        {
          id: 7700020,
          subcategory_name: 'Tenure/Ownership',
          category_id: 660005
        },
        {
          id: 7700021,
          subcategory_name: 'Waitangi Tribunal',
          category_id: 660005
        }
      ])
    })
}
