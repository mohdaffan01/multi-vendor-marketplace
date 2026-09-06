import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from './models/user.model.js';
import Vendor from './models/vendor.model.js';
import Category from './models/category.model.js';
import Product from './models/product.model.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://mdaffan01:S2arDiHeWkK7mzBv@cluster0.khlguvl.mongodb.net/multi-vendor-marketplace?retryWrites=true&w=majority&appName=Cluster0';

const categoriesData = [
  {
    name: 'Handmade Ceramics',
    description: 'Mugs, bowls, drip sets & artisanal vases',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAyURz0T_bro2kn6iN8AquSb8Bns3qqOgkjjyk82O0wEfZz65uD9ZC5GcdWaxPTZ93wwmzxG1Ajj3wwAj4kQT4yFKERv6oDXsS1K7RDrhsrO6L8BhmFFMtXiRx5Ib0lcWzFEndebAdrakzQMw7RvKr8Pi8U0EOTAZMMIk9_zelMJNie_Oadh4RDZyHRJAMc-LXJJ5tU7vUDzrC1yvYCNPcfBqFhFKwdTL-U6MGhxZtG_JNtk8v-GPRk',
  },
  {
    name: 'Botanical Skincare',
    description: 'Pure raw plant extracts & herbal oils',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCi68TNbBKGa06uXP-tdglqxz6gJCvN5ABAoWx4apw5-2_3UM1jMWMyUNGy3N52EV9-Mz657FUDeW2YGyIJZqRAkOqzSZThbwPZlFJkDICedJGaAMDfLFknRshgUix4GiQgPQVswk7j4fKRngWATgj8ygwO8wIugWIblIJuDGuVJZCZ-g6GnY2P_7qmPWscog5lPJHji7ZRpWcYtUXpfm0Xvs1cCadXwE74HaJDVGtBKL3jyllnjc1X',
  },
  {
    name: 'Organic Textiles',
    description: 'Eco-friendly linen & organic hemp goods',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCj47s_Ycgz5t7RkpqFWsuXbipyepqPYJ2grsGylZXTPrCuExHZtUStXjwE_XdvKSMsuclwOwuoEHPHgE48TiRYcV0PbWG-Upot7b6Y6tiSycbZg9hrmq8Sg4ndmsZ4cHO8de0uJa2PwkV5IcdAgNoPBMR2olOTg3HtlNVZZGPSg2nKwX2iLD8EOs2Mz08AUrqKOdXSO9yT6rR9lD_1L_8AOOEnzYu1asWsukGVVHWIOFxjBIHyrKTP',
  },
  {
    name: 'Artisan Pantry',
    description: 'Wildflower tea, raw honey & natural spices',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWHIta6l-70o7GiXb_ihoBBeXf6Yy_qzY5o72RX1rAO63adlMjmLT02llxTuEl078LRkpVpVY-FTFaJlW6GqaBwfTWEXh5jTOV0X5Ce3rkI1LloTJ4B2fDSuOPeotv36n6GNb8hxpGvNl-UqkhWw5Z8BhRt9cpVPz7ZtJiNGFMXMEhvJ4zdqS65yE14wfKpm_wmaGKkiPfnATCL0fyznAPqJ5m34-rcpp3FL9RUAPwDLanyvOpLOD8',
  },
  {
    name: 'Kitchen & Coffee',
    description: 'Slow coffee drippers, stoneware mugs & wooden spoons',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBs1th6lfJ7de2LjUl9OgIH8K0SY1NB-K6c9qamTZRB4UMo1MHlMSfwvl2yZTuvrmHJ6ilfW-0EWPlNsstwm3y0u_taDTgC1KAjj6aYVjVHRjg9JG78sGBpqIt9pLoJsnjwFP54ARakiKJz8LosuaUU-vW5hoHlEwdT2GUX3_X3__w4tYhMM38BiYWu7KvHcNC__aW-RSQdmqYyF0NnJkS9AZHWbJJQDxjPBWNJMkwg7q8NwoU_lXhs',
  },
];

export async function seedDatabase() {
  try {
    console.log('Connecting to MongoDBAtlas for seeding...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB!');

    // Clear existing data
    await User.deleteMany({});
    await Vendor.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});

    console.log('Cleared existing database collections.');

    // Create demo Users
    const hashedPassword = await bcrypt.hash('password123', 10);

    const vendorUser1 = await User.create({
      name: 'Elena Rostova',
      email: 'artisan@earthandclay.eco',
      password: hashedPassword,
      role: 'vendor',
      phone: '+1 503-555-0192',
    });

    const vendorUser2 = await User.create({
      name: 'Erik Lindqvist',
      email: 'erik@nordicwood.eco',
      password: hashedPassword,
      role: 'vendor',
      phone: '+1 206-555-0144',
    });

    const customerUser = await User.create({
      name: 'Sophia Green',
      email: 'sophia@verdantmart.eco',
      password: hashedPassword,
      role: 'customer',
      phone: '+1 503-555-0188',
    });

    console.log('Created Users.');

    // Create Vendors
    const vendor1 = await Vendor.create({
      storeName: 'Earth & Clay Studio',
      storeDescription: 'Handcrafted stoneware in Portland, OR',
      owner: vendorUser1._id,
      phone: '+1 503-555-0192',
      status: 'approved',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7cLD1qg45MxdAgUsh3Sds515gqsmEsXjy-UihBi_JldQfC_xGnU8KHYt08Nx7lZmUwW2tTgoLCRr59GMOlqrg2Y2yaGgS-kzM_YA9_6hEi-1iN8-rDUnx0nhLc8Ps_Mk_tu-ps6Hakom32DQx1iOzizzCo1Zcn1DRAP3Mz0PuQtQVhwE55MBNUVPcDYMOi-DwlQu6YRDNV48Y3WIAxw5aXTYDs2ZL209Q_RgbnbNHAAAkcGTdhCV8',
      banner: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiIdFgcUlC-mL5CgRG_J_vqhAKuXooJUJNj-WIwgI5R7wip9NS3qdr7jj2f1VG1Ei3MpVmm80xMMRs-1chLUsNmxNxaR3ITHfdXaqjHSoug44apS-5fqOb94jKcP6XY4vllcB-ySDhGd_v0cv8FyWq2yPUHtahUV9BDfCYKtCbxXSCJLeLq9o0_8JjzXdjXiBiCbE82BL6kTX67SlwjZK6TR0IR4Dw07nnrXqDVAnxiUx3fyvf0Kph',
    });

    const vendor2 = await Vendor.create({
      storeName: 'Nordic Woodcraft',
      storeDescription: 'Verified ethical woodcraft & stoneware',
      owner: vendorUser2._id,
      phone: '+1 206-555-0144',
      status: 'approved',
      logo: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqEXVSEOrHx0azWXTVgTy64u0WQW3aLOgaEraHVUPv-N4syW3YTNoXYA2lyPksLUKuo4rMPpk34pdSAH5htgjUzYuJcLEJxodB1JNes-Typ0pMX4Hx4Y-Ni4IvX-cTFaEpxtSeKNrFzzgToLLFPqNz3ArztUb6ExcBVGnCbt3_4FiJkddQjaY9qt5U8ZsBcb1CxeLjNzPkzdvpnUuNUEi34V4C_zpC7GGEuF9Kf3P-Ur7y4TdcCUje',
    });

    console.log('Created Vendors.');

    // Create Categories
    const categoriesMap = {};
    for (const catData of categoriesData) {
      const category = await Category.create(catData);
      categoriesMap[catData.name] = category._id;
    }

    console.log('Created Categories.');

    // Seed Products
    const productsToSeed = [
      {
        name: 'Handmade Ceramic Pour-Over Coffee Dripper & Carafe',
        description: 'Hand-thrown from local Willamette Valley stoneware clay, high-fired cone 10 for maximum heat retention. Delivers pure, balanced coffee bloom with zero plastic contact.',
        price: 68.0,
        category: categoriesMap['Kitchen & Coffee'] || categoriesMap['Handmade Ceramics'],
        stock: 12,
        vendor: vendor1._id,
        sellerUser: vendorUser1._id,
        ratings: 4.9,
        numReviews: 142,
        images: [
          'https://lh3.googleusercontent.com/aida-public/AB6AXuBs1th6lfJ7de2LjUl9OgIH8K0SY1NB-K6c9qamTZRB4UMo1MHlMSfwvl2yZTuvrmHJ6ilfW-0EWPlNsstwm3y0u_taDTgC1KAjj6aYVjVHRjg9JG78sGBpqIt9pLoJsnjwFP54ARakiKJz8LosuaUU-vW5hoHlEwdT2GUX3_X3__w4tYhMM38BiYWu7KvHcNC__aW-RSQdmqYyF0NnJkS9AZHWbJJQDxjPBWNJMkwg7q8NwoU_lXhs',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDJ1uJ_qiCNVVkYvUBTmnwVTPR9UQulTUxz2tUQ2J5KgKKNy1n6K8DDG6UBGBWuOI2cmTChUkGrJD3zIXncYB_pUtM2q6QLKgywN1-_WNMn9GJXTv4qnu5aVYMsH9hQujhisXlYP6jsua2w19KzKwiwCWP26YwmwSpdHrS-vfA-Dmv6OGgQL440nHQRBbIj78pDunyN_JZSpbRUc5iOYEuEFGMx3yX4JqUGT09HuhdautuzG3ENhu7u'
        ],
      },
      {
        name: 'Matte Sage Ceramic Mug',
        description: 'Double-walled ergonomic mug finished with organic sage glaze.',
        price: 28.0,
        category: categoriesMap['Handmade Ceramics'],
        stock: 24,
        vendor: vendor1._id,
        sellerUser: vendorUser1._id,
        ratings: 4.9,
        numReviews: 86,
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuB75pvqsIQz67iL1jCeDpgNEzx5cjxV2DuwD62PXJGmlRRtCfz1RH6ZPRcat8KNc6Nx48S6JPw6saBUr8YRmnkfJlnlY_lFIukpZhAz0GngN1NyiaPgGOLq4t2jGzyEDYha0RzCbRYU6zUxYsZhkKUuwUvI4hY7moJL7aEpmOMXUHz1DpR8O1KzfAlIecHA3tbcq-zn3YPzs_2W8DHbg-r-AYcUxZ8QwyCpM2GJNqirzdZ_E5LvbGRS'],
      },
      {
        name: 'Speckled Stoneware Dinner Plate (Set of 2)',
        description: 'Durable dishwasher-safe stoneware dinner plates with subtle basalt speckles.',
        price: 54.0,
        category: categoriesMap['Handmade Ceramics'],
        stock: 18,
        vendor: vendor2._id,
        sellerUser: vendorUser2._id,
        ratings: 4.8,
        numReviews: 42,
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuD0HFjTu0EvGHaykxaxzR0OETNCbF5tUv_5beYztK7XrLjf2RV5rZ9IADmXZVDxUyvl4soBw7R3TAhu-7q412yKkbCsZIlHNer6rXH_qtwYJaFuBE0n1u2-_fvtzjxQlsZPiuKhKSXJchpsgWuVzy-0aPn_pvY7AdXXSM7RzkeHWg5et6_-pO4KV00tMB--oB6tHepmOAWuEbB-H3hQj34Ug-wB1YnT_byn-hAVHHZvKFpjl2OX3Nre'],
      },
      {
        name: 'Minimalist Matcha Whisk & Bowl',
        description: 'Traditional bamboo whisk with hand-thrown ceramic matcha ceremonial bowl.',
        price: 42.0,
        category: categoriesMap['Artisan Pantry'],
        stock: 15,
        vendor: vendor1._id,
        sellerUser: vendorUser1._id,
        ratings: 5.0,
        numReviews: 19,
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuDAyKzxVtglfiwBKNEtu8GI2iIm2z2u6rHWaTh1sUnWP9yFUXGj4tKIKZiHT0yZcdj6novfGdYK1tS1m61uxACZMbtFWpmHdXsPXQvl9SVJljFmo8j_PlAy9sK4aYbStDiKLJ9EUXYfgD7KDQciZqMV3YJLjQTrMw8MdXZDz6UNLGeukaV6XdiPtYNrNGZOT7oE4iy79VPX9JvUmPnWExQ2szuGjJ_TCF1yICC5G_pjXHDDJiqqj6B9'],
      },
      {
        name: 'Hand-carved Olive Wood Spoon Set',
        description: 'Sustainably sourced Mediterranean olive wood, hand-treated with natural beeswax.',
        price: 22.0,
        category: categoriesMap['Kitchen & Coffee'],
        stock: 30,
        vendor: vendor2._id,
        sellerUser: vendorUser2._id,
        ratings: 4.7,
        numReviews: 63,
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuC3sKJaiaQb_DqIRx_eZ-idaiLcwvrZ1pyLahSng6OdYqN5U4uX5tDB8_u32TfGo76UJ_vxCmg9-Pg5i3wqDUCIMBaOjWOpRKiOd9EoHns-BtU-9da4ilOvx9cHsYePq_dAq96B9MWB8ZLiT-HWFOJhLuu55AKiqZLZKaRoQQwo1kpWjC5RbWb8n2Y1MXQ9yyS2nFhDK-9fRYzIY4rQ1UeTvaDI3xX3vUafnFtRr2HuuDP14xkC9-lY'],
      },
      {
        name: 'Organic Glaze Vase in Forest Green',
        description: 'Modern ceramic vase crafted with botanical mineral glazes.',
        price: 65.0,
        category: categoriesMap['Handmade Ceramics'],
        stock: 8,
        vendor: vendor1._id,
        sellerUser: vendorUser1._id,
        ratings: 4.9,
        numReviews: 31,
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAFNBYH1diQyeiCncwbqofcGTQaDUiVuGCkGC8y1zEVp2JH9F9qhsY4B3ucXkW16PmTLXppwGlLSprAWc1kCSmvUh9P4cZh_3jkZe-qfIR8_HkWR0EdYAYV4WOEvRj2RDP680KsL5csnUFEJ7QRtg7XyH7mkA-jwD-TouHSaipfAN8CkaOIkUVHS4z5s1bfaImoQtUipRywBJ6gttK2NHdrKAr2ets0_HQKXf2cCysDeBTDyryJSxCF'],
      },
      {
        name: 'Botanical Facial Serum',
        description: 'Cold-pressed rosehip and jojoba serum for deep skin hydration.',
        price: 36.0,
        category: categoriesMap['Botanical Skincare'],
        stock: 50,
        vendor: vendor1._id,
        sellerUser: vendorUser1._id,
        ratings: 5.0,
        numReviews: 154,
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAYFfbQXq7-JRjuXPc2hWSpJErd-tS7i6r9PaydHP-bOMVMMpWKazXzwaeHyGEg7yFD4IMteUMVgGW0cPJR70LNSextbx7j6cM_60QAs3GImp3bR4MspWL538jGiZ8g8Fv4enjn61jP19_Ln4195e0dVuOzGXIwpGF1mwUVR0BTIvUmJ_N_CPcRUftlUBvhcoKAbci57cHBZ-GtZdQ-1XLhjOT0z6BWUsqxE6w-zuJbLYT9SGtARJxm'],
      },
      {
        name: 'Organic Linen Throw Pillow',
        description: '100% natural European flax linen pillow cover with recycled kapok insert.',
        price: 48.0,
        category: categoriesMap['Organic Textiles'],
        stock: 20,
        vendor: vendor2._id,
        sellerUser: vendorUser2._id,
        ratings: 4.8,
        numReviews: 78,
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAufaCmggPc_LOvRWFHvo7T1Rzkf9Bpnr00n1sD_Kbsi4PWWrjSK1Imb4891KLgKdCuiSgDMUqiRxUIRUb4sLNV0JqBtRRrF4l-BE30i5NpRJWvsm2_DGegXOM6AUCb8hNGbSHb09EQCtkOcarsajAVz-1_-FsI8tFOk3USbbc4T1zTaNG7-3-JMNj0n_OSM05eA6oyXHAo79PGyFhakgC_RWfr2iDp2nUuDvX1P6gBZJn1ekpN54g_'],
      },
    ];

    const seededProducts = await Product.insertMany(productsToSeed);
    console.log(`Successfully seeded ${seededProducts.length} Products into MongoDB!`);
    console.log('MongoDB Seeding Completed Successfully.');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
  }
}

// Execute if run directly
if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  seedDatabase().then(() => process.exit(0));
}
