const { URL } = require('../utils/urls');
const { initBrowser, termBrowser } = require('../config/puppeteer');
const { pageMatches, header } = require('../utils/dataTestIds');
const { logAdmin, logUser } = require('../utils/logInto');
const { allMatches, onlyInProgress, onlyFinished } = require('../entities/matches');
const { validateMatches } = require('../utils/validateMatches');
const { dbReset, initSequelize, termSequelize } = require('../config/sequelize');
const { puppeteerDefs, containerPorts } = require('../config/constants');
const { getRequirement } = require('../utils/util');
const axios = require('axios').default;

const IN_PROGRESS = 'Em andamento';
const FINISH = 'Finalizado';
const ALL_MATCHES = 'Todos os Jogos';

let database, browser, page;

beforeAll(async () => {
  database = await initSequelize();
});

afterAll(async () => termSequelize(database));

beforeEach(async () => {
  await dbReset();
  [browser, page] = await initBrowser();
  await page.goto(URL(containerPorts.frontend).BASE_URL);
});

afterEach(async () => {
  await termBrowser(browser);
});

describe(getRequirement(16), () => {
  it('O avaliador verificará se tentar fazer a requisição correta na sua API, os dados corretos são retornados', async () => {
    const expectedResult = [
      {
        "id": 1,
        "teamName": "Avaí/Kindermann"
      },
      {
        "id": 2,
        "teamName": "Bahia"
      },
      {
        "id": 3,
        "teamName": "Botafogo"
      },
      {
        "id": 4,
        "teamName": "Corinthians"
      },
      {
        "id": 5,
        "teamName": "Cruzeiro"
      },
      {
        "id": 6,
        "teamName": "Ferroviária"
      },
      {
        "id": 7,
        "teamName": "Flamengo"
      },
      {
        "id": 8,
        "teamName": "Grêmio"
      },
      {
        "id": 9,
        "teamName": "Internacional"
      },
      {
        "id": 10,
        "teamName": "Minas Brasília"
      },
      {
        "id": 11,
        "teamName": "Napoli-SC"
      },
      {
        "id": 12,
        "teamName": "Palmeiras"
      },
      {
        "id": 13,
        "teamName": "Real Brasília"
      },
      {
        "id": 14,
        "teamName": "Santos"
      },
      {
        "id": 15,
        "teamName": "São José-SP"
      },
      {
        "id": 16,
        "teamName": "São Paulo"
      }
    ];

    const result = await axios
      .get(
        `${URL(containerPorts.backend).BASE_URL}/teams`,
      )
      .then(({ status, data }) => ({status, data}))
      .catch(({response: { status, data }}) => ({ status, data }));

    expect(result).toHaveProperty("status");
    expect(result).toHaveProperty("data");
    expect(result.status).toBe(200);
    expect(result.data).toMatchObject(expectedResult);
  });
});

describe(getRequirement(17), () => {
  it('O avaliador verificará se tentar fazer a requisição correta na sua API, os dados corretos são retornados', async () => {
    const expectedResult = {
      "id": 5,
      "teamName": "Cruzeiro"
    };

    const result = await axios
      .get(
        `${URL(containerPorts.backend).BASE_URL}/teams/5`,
      )
      .then(({ status, data }) => ({status, data}))
      .catch(({response: { status, data }}) => ({ status, data }));

    expect(result).toHaveProperty("status");
    expect(result).toHaveProperty("data");
    expect(result.status).toBe(200);
    expect(result.data).toMatchObject(expectedResult);
  });
});

describe(getRequirement(19), () => {
  it('Será validado que a página apresentará todos os dados de partidas sem nenhum filtro', async () => {
    await page.waitForTimeout(puppeteerDefs.pause.brief);

    const headerButtonShowMatches = await page.$(header.showMatchesButton);
    await headerButtonShowMatches.click();

    await page.waitForTimeout(puppeteerDefs.pause.brief);

    await validateMatches(page, ALL_MATCHES, allMatches, false);
  });
});

describe(getRequirement(20), () => {
  it('Será validado que ao escolher a opção de partidas em andamento será filtrado todas as partidas em andamento', async () => {
    await page.waitForTimeout(puppeteerDefs.pause.brief);

    const headerButtonShowMatches = await page.$(header.showMatchesButton);
    await headerButtonShowMatches.click();

    await page.waitForTimeout(puppeteerDefs.pause.brief);

    await validateMatches(page, IN_PROGRESS, onlyInProgress, false);
  });
});

describe(getRequirement(21), () => {
  it('Será validado que ao escolher a opção de partidas finalizadas será filtrado todas as partidas finalizadas', async () => {
    await page.waitForTimeout(puppeteerDefs.pause.brief);

    const headerButtonShowMatches = await page.$(header.showMatchesButton);
    await headerButtonShowMatches.click();

    await page.waitForTimeout(puppeteerDefs.pause.brief);

    await validateMatches(page, FINISH, onlyFinished, false);
  });
});
