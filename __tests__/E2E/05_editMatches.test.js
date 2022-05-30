const { URL } = require('../utils/urls');
const { dbReset, initSequelize, termSequelize } = require('../config/sequelize');
const { initBrowser, termBrowser } = require('../config/puppeteer');
const { teams } = require('../expected_results/trybe_football_club');
const { pageMatchSettings, header, pageMatches } = require('../utils/dataTestIds');
const { logAdmin } = require('../utils/logInto');
const { select } = require('../utils/query');
const { puppeteerDefs, containerPorts } = require('../config/constants');
const { normalize, getRequirement, delay } = require('../utils/util');
const waitForResponse = require('../utils/waitForResponse');


const oneGoal = '1';
const twoGoals = '2';
const fiveGoals = '5';
const finish = 'Finalizado';
const lastInsert = (list) => list[list.length - 1];

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


describe(getRequirement(27), () => {
  it('Será avaliado que é possível alterar o resultado de uma partida', async () => {
    await page.waitForTimeout(puppeteerDefs.pause.brief);

    const headerButtonLogin = await page.$(header.loginButton);
    await headerButtonLogin.click();

    await page.waitForTimeout(puppeteerDefs.pause.brief);

    await logAdmin(page, containerPorts.frontend);

    await page.waitForTimeout(puppeteerDefs.pause.brief);

    const testMatchId = 48;

    const editMatchButton = await page.$(pageMatches.matchStatusBtn(testMatchId));
    await editMatchButton.click();

    await page.waitForTimeout(puppeteerDefs.pause.brief);

    const selectQuantityGoalsHomeTeam = await page.$(pageMatchSettings.selectQuantityGoalsHomeTeam);
    const selectQuantityGoalsAwayTeam = await page.$(pageMatchSettings.selectQuantityGoalsAwayTeam);
    await page.waitForTimeout(puppeteerDefs.pause.brief);

    await selectQuantityGoalsHomeTeam.click({ clickCount: 3 });
    await selectQuantityGoalsHomeTeam.type(fiveGoals);
    await page.waitForTimeout(puppeteerDefs.pause.brief);

    await selectQuantityGoalsAwayTeam.click({ clickCount: 3 });
    await selectQuantityGoalsAwayTeam.type(twoGoals);

    const SaveEditMatchButton = await page.$(pageMatchSettings.editMatchButton);

    await waitForResponse({
      page,
      trigger: () => SaveEditMatchButton.click(),
      expectedRequestType: 'script',
      expectedRequestMethod: 'PATCH',
      expectedResponseStatus: 200,
      expectedResponseUrl: `${URL(containerPorts.backend).BASE_URL}/matches/${testMatchId}`,
      timeOut: 100000
    });

    const matches = await database.query(select.all.matches, { type: 'SELECT' });
    const normalizeMatches = normalize(matches);
    const lastInsertedRow = lastInsert(normalizeMatches);

    expect(lastInsertedRow.homeTeam).toBe(teams[12].id);
    expect(lastInsertedRow.awayTeam).toBe(teams[1].id);
    expect(lastInsertedRow.homeTeamGoals.toString()).toBe(fiveGoals);
    expect(lastInsertedRow.awayTeamGoals.toString()).toBe(twoGoals);
    expect(lastInsertedRow.inProgress).toBe(1);
  });
});

describe(getRequirement(28), () => {
  it('Será avaliado que é possível finalizar uma partida em andamento', async () => {
    await page.waitForTimeout(puppeteerDefs.pause.brief);

    const headerButtonLogin = await page.$(header.loginButton);
    await headerButtonLogin.click();

    await page.waitForTimeout(puppeteerDefs.pause.brief);

    await logAdmin(page, containerPorts.frontend);

    await page.waitForTimeout(puppeteerDefs.pause.brief);

    const editMatchButton = await page.$(pageMatches.matchStatusBtn(48));
    await editMatchButton.click();

    await page.waitForTimeout(puppeteerDefs.pause.brief);

    const finishMatchButton = await page.$(pageMatchSettings.finishMatchButton);
    await finishMatchButton.click();

    await page.waitForTimeout(puppeteerDefs.pause.brief);

    const buttonShowMatches = await page.$(header.showMatchesButton);
    await buttonShowMatches.click();

    await page.waitForTimeout(puppeteerDefs.pause.brief);

    const homeTeam = await page.$eval(pageMatches.homeTeam(48), (el) => el.innerText);
    const awayTeam = await page.$eval(pageMatches.awayTeam(48), (el) => el.innerText);
    const matchStatus = await page.$eval(pageMatches.matchStatus(48), (el) => el.innerText);

    const matches = await database.query(select.all.matches, { type: 'SELECT' });
    const normalizeMatches = normalize(matches);
    const lastInsertedRow = lastInsert(normalizeMatches);

    expect(homeTeam).toBe(teams[12].teamName);
    expect(awayTeam).toBe(teams[1].teamName);
    expect(matchStatus).toBe(finish);
    expect(lastInsertedRow.homeTeam).toBe(teams[12].id);
    expect(lastInsertedRow.awayTeam).toBe(teams[1].id);
    expect(lastInsertedRow.homeTeamGoals.toString()).toBe(oneGoal);
    expect(lastInsertedRow.awayTeamGoals.toString()).toBe(oneGoal);
    expect(lastInsertedRow.inProgress).toBe(0);
  });
});
