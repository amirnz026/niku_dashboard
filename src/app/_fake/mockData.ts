export const inventories: InventoryType[] = [
  {
    name: 'انبار محصولات اولیه',
    category: 'اولیه',
    status: 'فعال',
    users: ['حامد فاضلی', 'حسین سعادت'],
  },
  {
    name: 'انبار محصولات در حال ساخت',
    category: 'ثانویه',
    status: 'غیر فعال',
    users: ['سینا علی زاده', 'علی محمد زاده', 'مهدی هاشم پور'],
  },
  {
    name: 'انبار محصولات تولید شده',
    category: 'تولید شده',
    status: 'غیر فعال',
    users: ['محمد باقر قدوسی', 'پوریا تیموری'],
  },
  {
    name: 'انبار ضایعات',
    category: 'اولیه',
    status: 'غیر فعال',
    users: ['علی رضا رضایی', 'امین امینی', 'محمد وفایی کیا', 'عرفان دولتی'],
  },
  {
    name: 'انبار قطعات یدکی',
    category: 'ثانویه',
    status: 'فعال',
    users: ['پوریا تیموری', 'احمد قاسمی'],
  },
  {
    name: 'انبار پردازش',
    category: 'ثانویه',
    status: 'غیر فعال',
    users: ['علی رضا رضایی', 'امین امینی', 'محمد وفایی کیا', 'عرفان دولتی'],
  },
  {
    name: 'انبار توزیع',
    category: 'ثانویه',
    status: 'فعال',
    users: ['پوریا تیموری', 'احمد قاسمی'],
  },
  {
    name: 'انبار دسته بندی',
    category: 'ثانویه',
    status: 'فعال',
    users: ['سینا علی زاده', 'علی محمد زاده', 'مهدی هاشم پور'],
  },
];
export const inventoryCategories: string[] = ['اولیه', 'تولید شده', 'ثانویه'];

export const inventoryUsers: string[] = [
  'امیر الموتی',
  'امیر نظری',
  'علی نادری',
  'محمد وفایی کیا',
  'امین امینی',
  'علی رضا رضایی',
  'احمد قاسمی',
  'حسین سعادت',
  'محمد قدوسی',
  'مهدی هاشم پور',
  'حسین زیبا سرشت',
  'پوریا تیموری',
  'حامد فاضلی',
  'سینا علی زاده',
  'علی محمد زاده',
  'محمد باقر قدوسی',
  'عرفان دولتی',
];

export const categories: CategoryType[] = [
  {
    name: 'اولیه',
    status: 'فعال',
    desc: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.',
  },
  {
    name: 'ثانویه',
    status: 'فعال',
    desc: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد. در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.',
  },
  {
    name: 'تولیدشده',
    status: 'غیر فعال',
    desc: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است',
  },
];

export const units: UnitType[] = [
  {
    name: 'تن',
    status: 'فعال',
  },
  {
    name: 'دستگاه',
    status: 'فعال',
  },
  {
    name: 'عدد',
    status: 'غیر فعال',
  },
  {
    name: 'کیلوگرم',
    status: 'فعال',
  },
  {
    name: 'لیتر',
    status: 'فعال',
  },
];

export const products: ProductType[] = [
  {
    name: 'اسپرسو',
    category: 'قهوه',
    unit: 'عدد',
    prepTime: '5',
    productNumber: '10385',
    tags: ['تک نفره', 'پیشنهادی', 'پرفروشترین'],
    customizations: ['شکر اضافه'],
    productDetails: [
      {
        salesChannel: 'کیوسک',
        price: '25000',
        discount: '5000',
        tax: '9',
        maxPerOrder: '10',
        minQty: '1',
        inventory: 'انبار مغازه',
        status: 'فعال',
        supplyDate: 'شنبه 8 تا 10، چهارشنبه 10 تا 12',
      },
      {
        salesChannel: 'صندوق',
        price: '23000',
        discount: '2000',
        tax: '3',
        maxPerOrder: '20',
        minQty: '1',
        inventory: 'انبار مغازه',
        status: 'فعال',
        supplyDate: 'شنبه 8 تا 10',
      },
      {
        salesChannel: 'سایت',
        price: '30000',
        discount: '7000',
        tax: '8',
        maxPerOrder: '100',
        minQty: '1',
        inventory: 'انبار محصولات تولید شده',
        status: 'غیر فعال',
        supplyDate: 'همه روزه',
      },
      {
        salesChannel: 'دستگاه پوز',
        price: '21000',
        discount: '1000',
        tax: '6',
        maxPerOrder: '4',
        minQty: '1',
        inventory: 'انبار مغازه',
        status: 'غیر فعال',
        supplyDate: 'سه شنبه 10 تا 12',
      },
      {
        salesChannel: 'تبلت',
        price: '21000',
        discount: '1000',
        tax: '2',
        maxPerOrder: '4',
        minQty: '1',
        inventory: 'انبار مغازه',
        status: 'فعال',
        supplyDate: 'دو شنبه 10 تا 12',
      },
    ],
  },
  {
    name: 'هات چاکلت',
    category: 'قهوه',
    unit: 'عدد',
    prepTime: '7',
    productNumber: '10674',
    tags: ['تک نفره'],
    customizations: ['غلظت بالا'],
    productDetails: [
      {
        salesChannel: 'صندوق',
        price: '15000',
        discount: '4000',
        tax: '5',
        maxPerOrder: '16',
        minQty: '1',
        inventory: 'انبار مغازه',
        status: 'فعال',
        supplyDate: 'چهارشنبه 12 تا 14',
      },
      {
        salesChannel: 'سایت',
        price: '15000',
        discount: '3000',
        tax: '9',
        maxPerOrder: '16',
        minQty: '1',
        inventory: 'انبار محصولات تولید شده',
        status: 'فعال',
        supplyDate: 'همه روزه',
      },
    ],
  },
  {
    name: 'آب طالبی',
    category: 'آبمیوه',
    unit: 'لیتر',
    prepTime: '12',
    productNumber: '10453',
    tags: ['دو نفره', 'پیشنهادی'],
    customizations: ['گرم'],
    productDetails: [
      {
        salesChannel: 'صندوق',
        price: '40000',
        discount: '2000',
        tax: '9',
        maxPerOrder: '13',
        minQty: '5',
        inventory: 'انبار مغازه',
        status: 'فعال',
        supplyDate: 'شنبه 10 تا 15، چهارشنبه 18 تا 20',
      },
      {
        salesChannel: 'سایت',
        price: '39000',
        discount: '2000',
        tax: '0',
        maxPerOrder: '16',
        minQty: '1',
        inventory: 'انبار محصولات تولید شده',
        status: 'غیر فعال',
        supplyDate: 'همه روزه',
      },
      {
        salesChannel: 'تبلت',
        price: '27000',
        discount: '12000',
        tax: '5',
        maxPerOrder: '1',
        minQty: '1',
        inventory: 'انبار مغازه',
        status: 'غیر فعال',
        supplyDate: 'دو شنبه 8 تا 10',
      },
    ],
  },
  {
    name: 'بستنی وانیل زعفران',
    category: 'بستنی',
    unit: 'بسته',
    prepTime: '0',
    productNumber: '10234',
    tags: ['دو نفره', 'پرفروشترین'],
    customizations: ['خامه'],
    productDetails: [
      {
        salesChannel: 'صندوق',
        price: '14000',
        discount: '1000',
        tax: '5',
        maxPerOrder: '2',
        minQty: '1',
        inventory: 'انبار مغازه',
        status: 'فعال',
        supplyDate: 'پنج 8 تا 10',
      },
      {
        salesChannel: 'سایت',
        price: '15000',
        discount: '7000',
        tax: '8',
        maxPerOrder: '100',
        minQty: '1',
        inventory: 'انبار محصولات تولید شده',
        status: 'فعال',
        supplyDate: 'همه روزه',
      },
      {
        salesChannel: 'دستگاه پوز',
        price: '28000',
        discount: '1300',
        tax: '8',
        maxPerOrder: '4',
        minQty: '1',
        inventory: 'انبار مغازه',
        status: 'غیر فعال',
        supplyDate: 'دو شنبه 10 تا 12',
      },
      {
        salesChannel: 'تبلت',
        price: '17000',
        discount: '2000',
        tax: '4',
        maxPerOrder: '2',
        minQty: '1',
        inventory: 'انبار مغازه',
        status: 'فعال',
        supplyDate: 'سه شنبه 12 تا 15',
      },
    ],
  },
  {
    name: 'اسموتی آناناس',
    category: 'اسموتی',
    unit: 'لیتر',
    prepTime: '12',
    productNumber: '10654',
    tags: ['تک نفره', 'پیشنهادی', 'پرفروشترین'],
    customizations: ['شکر اضافه'],
    productDetails: [
      {
        salesChannel: 'کیوسک',
        price: '14000',
        discount: '2000',
        tax: '9',
        maxPerOrder: '10',
        minQty: '1',
        inventory: 'انبار مغازه',
        status: 'فعال',
        supplyDate: 'چهارشنبه 10 تا 12',
      },
      {
        salesChannel: 'صندوق',
        price: '23000',
        discount: '2000',
        tax: '3',
        maxPerOrder: '20',
        minQty: '1',
        inventory: 'انبار مغازه',
        status: 'فعال',
        supplyDate: 'شنبه 8 تا 10',
      },
      {
        salesChannel: 'سایت',
        price: '30000',
        discount: '7000',
        tax: '8',
        maxPerOrder: '100',
        minQty: '1',
        inventory: 'انبار محصولات تولید شده',
        status: 'غیر فعال',
        supplyDate: 'همه روزه',
      },
      {
        salesChannel: 'دستگاه پوز',
        price: '21000',
        discount: '1000',
        tax: '6',
        maxPerOrder: '4',
        minQty: '1',
        inventory: 'انبار مغازه',
        status: 'غیر فعال',
        supplyDate: 'سه شنبه 10 تا 12',
      },
      {
        salesChannel: 'تبلت',
        price: '21000',
        discount: '1000',
        tax: '2',
        maxPerOrder: '4',
        minQty: '1',
        inventory: 'انبار مغازه',
        status: 'فعال',
        supplyDate: 'دو شنبه 10 تا 12',
      },
    ],
  },
];
