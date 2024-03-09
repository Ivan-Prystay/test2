## Example app using MongoDB

[MongoDB](https://www.mongodb.com/) is a general purpose, document-based, distributed database built for modern application developers and for the cloud era. This example will show you how to connect to and use MongoDB as your backend for your Next.js app.

If you want to learn more about MongoDB, visit the following pages:

- [MongoDB Atlas](https://mongodb.com/atlas)
- [MongoDB Documentation](https://docs.mongodb.com/)

## Deploy your own

Once you have access to the environment variables you'll need, deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?project-name=with-mongodb&repository-name=with-mongodb&repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js%2Ftree%2Fcanary%2Fexamples%2Fwith-mongodb&integration-ids=oac_jnzmjqM10gllKmSrG0SGrHOH)

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create-next-app --example with-mongodb with-mongodb-app
```

```bash
yarn create next-app --example with-mongodb with-mongodb-app
```

```bash
pnpm create next-app --example with-mongodb with-mongodb-app
```

## Configuration

### Set up a MongoDB database

Set up a MongoDB database either locally or with [MongoDB Atlas for free](https://mongodb.com/atlas).

### Set up environment variables

Copy the `env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Set each variable on `.env.local`:

- `MONGODB_URI` - Your MongoDB connection string. If you are using [MongoDB Atlas](https://mongodb.com/atlas) you can find this by clicking the "Connect" button for your cluster.

### Run Next.js in development mode

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```

Your app should be up and running on [http://localhost:3000](http://localhost:3000)! If it doesn't work, post on [GitHub discussions](https://github.com/vercel/next.js/discussions).

You will either see a message stating "You are connected to MongoDB" or "You are NOT connected to MongoDB". Ensure that you have provided the correct `MONGODB_URI` environment variable.

When you are successfully connected, you can refer to the [MongoDB Node.js Driver docs](https://mongodb.github.io/node-mongodb-native/3.4/tutorials/collections/) for further instructions on how to query your database.

## Deploy on Vercel

You can deploy this app to the cloud with [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

#### Deploy Your Local Project

To deploy your local project to Vercel, push it to GitHub/GitLab/Bitbucket and [import to Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example).

**Important**: When you import your project on Vercel, make sure to click on **Environment Variables** and set them to match your `.env.local` file.

# READMY

Додаток написано мовою TypeScript за допомогою фрейморку NextJS 14,variant - "Page Routing" та одночасно підтримує клієнтську і серверну частину. Для бази даних використано MongoDB. Створено 5 колекцій для запитів ліків із 5-ти аптек (від 12 до 17000 записів) та одна колекція для запису історії замовлень. Реалізовано тільки Desktop версія.

На даний час реалізовано:

a. Header:

- містить панель навігації між сторінками (доступний на всіх сторінках), кнопка поточної сторінки відрізняється за кольором.

b. Footer:

- містить інформацію про розробника (доступний на всіх сторінках).

с. сторінка Shop:

- відображає два блоки (блок із групою кнопок вибору аптеки та блок відображення отриманих ліків);
- можливість автоматичного завантаження колекції із першої аптеки;
- можливість довантажувати інформацію за допомогою кнопки "Load More";
- завантаження відбувається порціями по 10 записів;
- реалізовано можливість сортування отриманих ліків за ціною та за назвою (як за зростанням так і за спаданням);
- також в карточці окремого препарату є кнопка яка додає або видаляє цей товар в(з) кошик(-а);
- також є кнопка яка дозволяє одночасно видалити всі товари з кошика;
- товари які додані до кошика зберігаються в localStorage та доступні після перезавантаження браузера.

d. сторінка Shopping Cart:

- містить форму замовлення, яка складається з блоку з особистою інформацією та доданими в кошик карточками ліків;
- карточки можна видалити з кошика по одній, або всі одразу - за допомогою кнопки "Clear Cart";
- карточки які видалені з кошика, видаляються з localStorage;
- карточка одного товару відображає назву препарату, ціну, назву магазину, а також є поле для вибору кількості одиниць товару;
- в правому нижньому куті відображено поле із загальною сумою покупки;
- якщо загальна сума = 0 або не заповнені поля з особистою інформацією, дані з форми не відправляються в іншому випадку зібрана інформація відправляється до БД;
- після успішного надсилання, всі поля форми та вміст кошика очищаються;

e. сторінка History:

- при переході на сторінку автоматично відсилається запит до БД;
- та отримана інформація відображається у вигляді таблиці.

f. сторінка Coupons:

- на даний час сторінка не реалізована.

Run Next.js in development mode

```bash
npm install
npm run dev

# or

yarn install
yarn dev
```

Your app should be up and running on [http://localhost:3000](http://localhost:3000)!

Також глобально сайт розміщено на сервісі Vercel [https://test2-kappa-nine.vercel.app](https://test2-kappa-nine.vercel.app).
