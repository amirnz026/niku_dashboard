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
    status: 'فعال',
  },
  {
    name: 'چای',
    status: 'فعال',
  },
  {
    name: 'پیتزا',
    status: 'غیر فعال',
  },
  {
    name: 'قرمه سبزی',
    status: 'فعال',
  },
  {
    name: 'هات داگ',
    status: 'فعال',
  },
];
