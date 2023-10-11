import { test, expect, Page } from '@playwright/test';
import { WHCategoriesPage } from './warehouse-categories.page';
import { Config } from "@tests/shared/environment-configuration";

const config = new Config();
let urlHome: string = "/dashboard/";
let urlWHCategories: string = "/supply-chain/inventory-management/setups/warehouse-setup/warehouse-category/";
let whCategoriesPage: any;

test.use({viewport: {width:1536,height: 824}}) //width:1536,height: 824 //width:1920,height:1040

test.describe('Warehouse Categories', () => {

  test('Open supply chain WH Categories', async ({ page }) => {
    whCategoriesPage = new WHCategoriesPage(page);
    await whCategoriesPage.navigate_to_homepage(config.baseUrl+urlHome);
    await whCategoriesPage.open_WHCategories();

    await expect(page.locator('[class="k-button k-button-icontext k-grid-add d-inline-block"]')).toBeVisible();
  });

  test('Add valid WH Category', async ({ page }) => {
    const timeStamp = Date.now().toString();
    whCategoriesPage = new WHCategoriesPage(page);
    await whCategoriesPage.navigate_to_whCategoriesList(config.baseUrl+urlWHCategories);
    await whCategoriesPage.add_WHCategory();
    await whCategoriesPage.fill_WHCategory('WH_C En' + timeStamp, 'WH_C Ar' + timeStamp, 'WH_C desc' + timeStamp, 'WHPrefix' + timeStamp);
    await whCategoriesPage.save_WHCategory();
    await expect(await whCategoriesPage.locate_nameEnWHLabelByIndex(0)).toHaveText('WH_C En' + timeStamp);
  });

  test('Add valid WH Category without description', async ({ page }) => {
    const timeStamp = Date.now().toString();
    whCategoriesPage = new WHCategoriesPage(page);
    await whCategoriesPage.navigate_to_whCategoriesList(config.baseUrl+urlWHCategories);
    await whCategoriesPage.add_WHCategory();
    await whCategoriesPage.fill_WHCategory('WH_C En' + timeStamp, 'WH_C Ar' + timeStamp, '', 'WHPrefix' + timeStamp);
    await whCategoriesPage.save_WHCategory();
    await expect(await whCategoriesPage.locate_nameEnWHLabelByIndex(0)).toHaveText('WH_C En' + timeStamp);
  });

  test('Add invalid WH Category with empty English Name', async ({ page }) => {
    const timeStamp = Date.now().toString();
    whCategoriesPage = new WHCategoriesPage(page);
    await whCategoriesPage.navigate_to_whCategoriesList(config.baseUrl+urlWHCategories);
    await whCategoriesPage.add_WHCategory();
    await whCategoriesPage.fill_WHCategory('', 'WH_C Ar' + timeStamp, 'WH_C desc' + timeStamp, 'WHPrefix' + timeStamp);
    await whCategoriesPage.save_WHCategory();
    await expect(await whCategoriesPage.locate_invalidMessageByMessage('Required')).toBeVisible();
  });

  test('Add invalid WH Category with empty Arabic Name', async ({ page }) => {
    const timeStamp = Date.now().toString();
    whCategoriesPage = new WHCategoriesPage(page);
    await whCategoriesPage.navigate_to_whCategoriesList(config.baseUrl+urlWHCategories);
    await whCategoriesPage.add_WHCategory();
    await whCategoriesPage.fill_WHCategory('WH_C En' + timeStamp, '', 'WH_C desc' + timeStamp, 'WHPrefix' + timeStamp);
    await whCategoriesPage.save_WHCategory();
    await expect(await whCategoriesPage.locate_invalidMessageByMessage('Required')).toBeVisible();
  });

  test('Add invalid WH Category with empty Prefix', async ({ page }) => {
    const timeStamp = Date.now().toString();
    whCategoriesPage = new WHCategoriesPage(page);
    await whCategoriesPage.navigate_to_whCategoriesList(config.baseUrl+urlWHCategories);
    await whCategoriesPage.add_WHCategory();
    await whCategoriesPage.fill_WHCategory('WH_C En' + timeStamp, 'WH_C Ar' + timeStamp, 'WH_C desc'+ timeStamp,'');
    await whCategoriesPage.save_WHCategory();
    await expect(await whCategoriesPage.locate_invalidMessageByMessage('Required')).toBeVisible();
  });

  test('Add invalid WH Category with duplicate English Name', async ({ page }) => {
    const timeStamp = Date.now().toString();
    whCategoriesPage = new WHCategoriesPage(page);
    await whCategoriesPage.navigate_to_whCategoriesList(config.baseUrl+urlWHCategories);
    const firstEnName: any = await whCategoriesPage.locate_nameEnWHLabelByIndex(0).textContent();
    await whCategoriesPage.add_WHCategory();
    await whCategoriesPage.fill_WHCategory(firstEnName, 'WH_C Ar' + timeStamp, 'WH_C desc' + timeStamp, 'WHPrefix' + timeStamp);
    await whCategoriesPage.save_WHCategory();
    await expect(await whCategoriesPage.locate_invalidMessageByMessage('Duplicate')).toBeVisible();
  });

  test('Add invalid WH Category with duplicate Arabic Name', async ({ page }) => {
    const timeStamp = Date.now().toString();
    whCategoriesPage = new WHCategoriesPage(page);
    await whCategoriesPage.navigate_to_whCategoriesList(config.baseUrl+urlWHCategories);
    const firstArName: any = await whCategoriesPage.locate_nameArWHLabelByIndex(0).textContent();
    await whCategoriesPage.add_WHCategory();
    await whCategoriesPage.fill_WHCategory('WH_C En' + timeStamp, firstArName, 'WH_C desc' + timeStamp, 'WHPrefix' + timeStamp);
    await whCategoriesPage.save_WHCategory();
    await expect(await whCategoriesPage.locate_invalidMessageByMessage('Duplicate')).toBeVisible();
  });

  test('Add invalid WH Category with duplicate Prefix', async ({ page }) => {
    const timeStamp = Date.now().toString();
    whCategoriesPage = new WHCategoriesPage(page);
    await whCategoriesPage.navigate_to_whCategoriesList(config.baseUrl+urlWHCategories);
    const firstPrefix: any = await whCategoriesPage.locate_prefixWHLabelByIndex(0).textContent();
    await whCategoriesPage.add_WHCategory();
    await whCategoriesPage.fill_WHCategory('WH_C En' + timeStamp, 'WH_C Ar' + timeStamp, 'WH_C desc' + timeStamp, firstPrefix);
    await whCategoriesPage.save_WHCategory();
    await expect(await whCategoriesPage.locate_invalidMessageByMessage('Duplicate')).toBeVisible();
  });
  test('Cancel Adding WH Category', async ({ page }) => {
    const timeStamp = Date.now().toString();
    whCategoriesPage = new WHCategoriesPage(page);
    await whCategoriesPage.navigate_to_whCategoriesList(config.baseUrl+urlWHCategories);
    await whCategoriesPage.add_WHCategory();
    await whCategoriesPage.fill_WHCategory('WH_C En' + timeStamp, 'WH_C Ar' + timeStamp, 'WH_C desc' + timeStamp, 'WHPrefix' + timeStamp);
    await whCategoriesPage.cancel_WHCategory();
    await expect(await whCategoriesPage.locate_nameEnWHLabelByIndexAndText(0, 'new WH_C En' + timeStamp)).toHaveCount(0);
  });

  test('Edit WH Category English Name', async ({ page }) => {
    const timeStamp = Date.now().toString();
    whCategoriesPage = new WHCategoriesPage(page);
    await whCategoriesPage.navigate_to_whCategoriesList(config.baseUrl+urlWHCategories);
    await whCategoriesPage.edit_WHCategory(0);
    await whCategoriesPage.fill_WHCategory('new WH_C En' + timeStamp, 'new WH_C Ar' + timeStamp, 'new WH_C desc' + timeStamp, 'newWHPrefix' + timeStamp);
    await whCategoriesPage.save_WHCategory();
    await expect(await whCategoriesPage.locate_nameEnWHLabelByIndex(0)).toHaveText('new WH_C En' + timeStamp);
  });

  test('Edit WH Category with empty English Name', async ({ page }) => {
    whCategoriesPage = new WHCategoriesPage(page);
    await whCategoriesPage.navigate_to_whCategoriesList(config.baseUrl+urlWHCategories);
    await whCategoriesPage.edit_WHCategory(0);
    await whCategoriesPage.fill_nameEnWHField('');
    await whCategoriesPage.save_WHCategory();
    await expect(await whCategoriesPage.locate_invalidMessageByMessage('Required')).toBeVisible();
  });

  test('Edit WH Category with empty Arabic Name', async ({ page }) => {
    whCategoriesPage = new WHCategoriesPage(page);
    await whCategoriesPage.navigate_to_whCategoriesList(config.baseUrl+urlWHCategories);
    await whCategoriesPage.edit_WHCategory(0);
    await whCategoriesPage.fill_nameArWHField('');
    await whCategoriesPage.save_WHCategory();
    await expect(await whCategoriesPage.locate_invalidMessageByMessage('Required')).toBeVisible();
  });

  test('Edit WH Category with empty Prefix', async ({ page }) => {
    whCategoriesPage = new WHCategoriesPage(page);
    await whCategoriesPage.navigate_to_whCategoriesList(config.baseUrl+urlWHCategories);
    await whCategoriesPage.edit_WHCategory(0);
    await whCategoriesPage.fill_prefixWHField('');
    await whCategoriesPage.save_WHCategory();
    await expect(await whCategoriesPage.locate_invalidMessageByMessage('Required')).toBeVisible();
  });

  test('Edit WH Category with duplicate English Name', async ({ page }) => {
    whCategoriesPage = new WHCategoriesPage(page);
    await whCategoriesPage.navigate_to_whCategoriesList(config.baseUrl+urlWHCategories);
    const secondEnName: any = await whCategoriesPage.locate_nameEnWHLabelByIndex(1).textContent();
    await whCategoriesPage.edit_WHCategory(0);
    await whCategoriesPage.fill_nameEnWHField(secondEnName);
    await whCategoriesPage.save_WHCategory();
    await expect(await whCategoriesPage.locate_invalidMessageByMessage('Duplicate')).toBeVisible();
  });

  test('Edit WH Category with duplicate Arabic Name', async ({ page }) => {
    whCategoriesPage = new WHCategoriesPage(page);
    await whCategoriesPage.navigate_to_whCategoriesList(config.baseUrl+urlWHCategories);
    const secondArName: any = await whCategoriesPage.locate_nameArWHLabelByIndex(1).textContent();
    await whCategoriesPage.edit_WHCategory(0);
    await whCategoriesPage.fill_nameArWHField(secondArName);
    await whCategoriesPage.save_WHCategory();
    await expect(await whCategoriesPage.locate_invalidMessageByMessage('Duplicate')).toBeVisible();
  });

  test('Edit WH Category with duplicate Prefix', async ({ page }) => {
    whCategoriesPage = new WHCategoriesPage(page);
    await whCategoriesPage.navigate_to_whCategoriesList(config.baseUrl+urlWHCategories);
    const secondPrefix: any = await whCategoriesPage.locate_prefixWHLabelByIndex(1).textContent();
    await whCategoriesPage.edit_WHCategory(0);
    await whCategoriesPage.fill_prefixWHField(secondPrefix);
    await whCategoriesPage.save_WHCategory();
    await expect(await whCategoriesPage.locate_invalidMessageByMessage('Duplicate')).toBeVisible();
  });

  test('Cancel Editing WH Category English Name', async ({ page }) => {
    const timeStamp = Date.now().toString();
    whCategoriesPage = new WHCategoriesPage(page);
    await whCategoriesPage.navigate_to_whCategoriesList(config.baseUrl+urlWHCategories);
    await whCategoriesPage.edit_WHCategory(0);
    await whCategoriesPage.fill_WHCategory('new WH_C En' + timeStamp, 'new WH_C Ar' + timeStamp, 'new WH_C desc' + timeStamp, 'newWHPrefix' + timeStamp);
    await whCategoriesPage.cancel_WHCategory();
    await expect(await whCategoriesPage.locate_nameEnWHLabelByIndexAndText(0, 'new WH_C En' + timeStamp)).toHaveCount(0);
  });

  test('Delete first WH Category', async ({ page }) => {
    whCategoriesPage = new WHCategoriesPage(page);
    await whCategoriesPage.navigate_to_whCategoriesList(config.baseUrl+urlWHCategories);
    const firstEnName: any = await whCategoriesPage.locate_nameEnWHLabelByIndex(0).textContent();
    //Delete the item
    await whCategoriesPage.delete_Yes_WHCategory(0);
    //Assert that the deleted item is hidden
    await expect(await whCategoriesPage.locate_nameEnWHLabelByIndexAndText(0, firstEnName)).toHaveCount(0);

  });

  test('Cancel delete first WH Category', async ({ page }) => {
    whCategoriesPage = new WHCategoriesPage(page);
    await whCategoriesPage.navigate_to_whCategoriesList(config.baseUrl+urlWHCategories);
    const firstEnName: any = await whCategoriesPage.locate_nameEnWHLabelByIndex(0).textContent();
    //Not to delete the item
    await whCategoriesPage.delete_No_WHCategory(0);
    //Assert that the item is not deleted
    await expect(await whCategoriesPage.locate_nameEnWHLabelByIndexAndText(0, firstEnName)).toBeVisible();

  });
});
