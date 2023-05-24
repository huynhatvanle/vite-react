import slug from 'slug';
export default class Common {
  elements = {
    messageSwal2: () => cy.get('div#swal2-html-container').should('be.visible'),
    textButton: (text: string) => cy.get('button').contains(text).should('be.visible').should('not.be.disabled'),
    textMenu: (text: string) => cy.get('li.menu').contains(text).should('be.visible'),
    textSubMenu: (text: string) => cy.get('a.sub-menu').contains(text).should('be.visible'),

    checkboxWrapper: (text: string) => cy.get(`.ant-checkbox-wrapper`).contains(text).should('be.visible'),
    buttonRightTransfer: () => cy.get(`.ant-transfer-operation button`).eq(1).should('be.visible'),
    forItemByName: (name: string) =>
      cy.contains('.ant-form-item-label > label', name).parent().parent().should('be.visible'),
    inputByName: (name: string) => this.elements.forItemByName(name).find('input').should('be.visible'),
    errorByName: (name: string) =>
      this.elements.forItemByName(name).find('.ant-form-item-explain-error').should('be.visible'),
    switchByName: (name: string) => this.elements.forItemByName(name).find('nz-switch').should('be.visible'),
    selectByName: (name: string) =>
      this.elements
        .forItemByName(name)
        .find('nz-select')
        .click()
        .find('.ant-select-selection-search-input')
        .should('be.visible'),
    selectSelectionTitle: () => cy.get(`nz-option-item`),
    buttonConfirmPopover: () => cy.get('.ant-popover-buttons .ant-btn-primary').should('be.visible'),

    treeSelectByName: (name: string) => this.elements.forItemByName(name).find('nz-tree-select').should('be.visible'),
    treeSelectSelectionTitle: (title: string) => cy.get(`.ant-select-tree-node-content-wrapper[title='${title}']`),
    treeByName: (val: any) => cy.get('nz-tree-node-title[title="' + val + '"]  > .group'),
    removeTreeByName: (val: any) => this.elements.treeByName(val).find('.la-trash'),
    tableByName: (val: any) => cy.get('.ant-table-cell').contains(val),
    removeTableByName: (val: any) =>
      this.elements.tableByName(val).parent().parent().find(`button[ng-reflect-title='Are you sure to delete']`),
    editTableByName: (val: any) =>
      this.elements.tableByName(val).parent().parent().find(`button[ng-reflect-title='Are you sure to edit']`),
  };

  verifyMessageSwal2 = (message: string) => {
    if (message.indexOf('_@') > -1 && message.indexOf('@_') > -1) {
      const arrayValue = message.match(/(_@[A-Z])\w+\s+\w+@_/g);
      arrayValue?.forEach(async (text, index) => {
        const val = await this.getTag(text.replace('_@', '').replace('@_', ''));
        message = message.replace(text, val);
        if (arrayValue?.length - 1 === index) this.elements.messageSwal2().should('have.text', message);
      });
    } else this.elements.messageSwal2().should('have.text', message);
    cy.get('.swal2-confirm').then((button) => !!button && button.click());
  };
  clickTextButton = (text: string) => this.elements.textButton(text).click();
  clickTextMenu = (text: string) => this.elements.textMenu(text).click();
  clickTextSubMenu = (text: string, url: string) => {
    this.elements.textSubMenu(text).click();
    cy.url().should('include', url);
  };

  clickCheckboxWrapper = (list: string) => {
    list.split(', ').forEach((item: string) => this.elements.checkboxWrapper(item).click());
    this.elements.buttonRightTransfer().click();
  };
  typeInputByName = (type: 'text' | 'words' | 'number' | 'email' | 'percentage', name: string, text: string) => {
    const input = this.elements.inputByName(name).typeRandom(text, type);
    if (text) input.invoke('val').as(slug(name));
  };
  verifyErrorByName = (name: string, text: string) => this.elements.errorByName(name).should('have.text', text);
  clickSwitchByName = (name: string) => this.elements.switchByName(name).click();
  clickSelectByName = (name: string, text: string) => {
    const handle = async (text: string | Promise<string>) => {
      const newText = await text;
      this.elements.selectByName(name).type(newText);
      this.elements.selectSelectionTitle().should('be.visible').click();
    };
    if (text.indexOf('_@') > -1 && text.indexOf('@_') > -1)
      handle(this.getTag(text.replace('_@', '').replace('@_', ''))).then();
    else handle(text).then();
  };
  clickEditTableByName = (name: string) =>
    cy.get(`@${slug(name)}`).then((val) => this.elements.editTableByName(val).click());
  clickRemoveTableByName = (name: string) => {
    const hand = async () => {
      const val = await this.getTag(name);
      this.elements.removeTableByName(val).click({ force: true });
      this.elements.buttonConfirmPopover().click({ force: true });
    };
    hand().then();
  };

  clickTreeSelectByName = (name: string, text: string) => {
    const handle = async (text: string | Promise<string>) => {
      const newText = await text;
      this.elements.treeSelectByName(name).type(newText);
      this.elements.treeSelectSelectionTitle(newText).then((e) => {
        cy.get('.ant-select-tree-list-holder-inner').scrollIntoView({ offset: { top: e[0].offsetTop, left: 0 } });
        this.elements.treeSelectSelectionTitle(newText).should('be.visible').click();
      });
    };
    if (text.indexOf('_@') > -1 && text.indexOf('@_') > -1)
      handle(this.getTag(text.replace('_@', '').replace('@_', ''))).then();
    else handle(text).then();
  };
  clickTreeByName = (name: string) => cy.get(`@${slug(name)}`).then((val) => this.elements.treeByName(val).click());
  clickRemoveTreeByName = (name: string) => {
    const hand = async () => {
      const val = await this.getTag(name);
      this.elements.removeTreeByName(val).click({ force: true });
      this.elements.buttonConfirmPopover().click({ force: true });
    };
    hand().then();
  };

  getTag = async (name: string): Promise<string> =>
    new Promise((resolve) => cy.get(`@${slug(name)}`).then((val) => resolve(val.toString())));
}
