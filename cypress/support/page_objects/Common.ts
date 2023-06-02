import slug from 'slug';
export default class Common {
  elements = {
    textButton: (text: string) => cy.get('button').contains(text).should('be.visible').should('not.be.disabled'),
    iconButton: (text: string) => cy.get(`button[title="${text}"]`).should('be.visible').should('not.be.disabled'),
    textMenu: (text: string) => cy.get('li.menu').contains(text).should('be.visible'),
    textSubMenu: (text: string) => cy.get('a.sub-menu').contains(text).should('be.visible'),
    textTabBtn: (text: string) => cy.get('.ant-tabs-tab-btn').contains(text).should('be.visible'),
    tableByName: (val: string) => cy.get('.ant-table-cell').contains(val).should('be.visible'),
    buttonTableByName: (val: string, text: string) =>
      this.elements.tableByName(val).parents('tr').find(`button[title="${text}"]`).should('be.visible'),
    buttonConfirmPopover: () => cy.get('.ant-popover .ant-btn-primary').should('be.visible'),
    messageSwal2: () => cy.get('div#swal2-html-container').should('be.visible'),
    spin: () => cy.get('.ant-spin-spinning').should('not.exist'),

    forItemByName: (name: string) =>
      cy.contains('.ant-form-item-label > label', name).parent().parent().should('be.visible'),
    inputByName: (name: string) => this.elements.forItemByName(name).find('input').should('be.visible'),
    textareaByName: (name: string) => this.elements.forItemByName(name).find('textarea').should('be.visible'),
    editorByName: (name: string) => this.elements.forItemByName(name).find('.ce-paragraph'),
    editorHtmlByName: (name: string) => this.elements.forItemByName(name).find('.note-editable'),
    fileByName: (name: string) => this.elements.forItemByName(name).find('input[type=file]'),
    pickerInputByName: (name: string) =>
      this.elements.forItemByName(name).find('.ant-picker-input input').should('be.visible'),
    switchByName: (name: string) => this.elements.forItemByName(name).find('.ant-switch').should('be.visible'),
    radioByName: (name: string, text: string) =>
      this.elements.forItemByName(name).find('.ant-radio-wrapper-in-form-item').contains(text).should('be.visible'),
    selectByName: (name: string) =>
      this.elements
        .forItemByName(name)
        .find('.ant-select')
        .click()
        .find('.ant-select-selection-search-input')
        .should('be.visible'),
    errorByName: (name: string) =>
      this.elements.forItemByName(name).find('.ant-form-item-explain-error').should('be.visible'),

    checkboxWrapper: (text: string) => cy.get(`.ant-checkbox-wrapper`).contains(text).should('be.visible'),
    buttonRightTransfer: () => cy.get(`.ant-transfer-operation button`).eq(1).should('be.visible'),
    treeSelectByName: (name: string) => this.elements.forItemByName(name).find('.ant-tree-select').should('be.visible'),
    treeSelectSelectionTitle: (title: string) => cy.get(`.ant-select-tree-node-content-wrapper[title='${title}']`),
    treeByName: (val: string) => cy.get('.ant-tree-node-content-wrapper[title="' + val + '"]  > .group'),
    removeTreeByName: (val: string) => this.elements.treeByName(val).find('.la-trash'),
  };
  getTag = async (name: string): Promise<string> =>
    new Promise((resolve) => cy.get(`@${slug(name)}`).then((val) => resolve(val.toString())));
  clickSubmitPopover = () =>
    cy
      .wait(0)
      .then(() => cy.$$('.ant-popover .ant-btn-primary').length && this.elements.buttonConfirmPopover().click());

  clickTextButton = (text: string) => {
    this.elements.textButton(text).click();
    this.clickSubmitPopover();
  };
  clickIconButton = (text: string) => {
    this.elements.iconButton(text).click();
    this.clickSubmitPopover();
  };
  clickTextMenu = (text: string) => this.elements.textMenu(text).click();
  clickTextSubMenu = (text: string, url: string) => {
    this.elements.textSubMenu(text).click();
    cy.url().should('include', url);
  };
  clickTextTabBtn = (text: string) => this.elements.textTabBtn(text).click();
  clickButtonTableByName = (text: string, name: string) => {
    this.elements.spin();
    const hand = async () => {
      const val = await this.getTag(name);
      this.elements.buttonTableByName(val, text).click();
    };
    hand().then();
    this.clickSubmitPopover();
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
    cy.wait(0);
  };

  typeInputByName = (type: inputType, name: string, text: string) => {
    const input = this.elements.inputByName(name).typeRandom(text, type);
    if (text) input.invoke('val').as(slug(name));
  };
  typeTextareaByName = (type: inputType, name: string, text: string) => {
    const input = this.elements.textareaByName(name).typeRandom(text, type);
    if (text) input.invoke('val').as(slug(name));
  };
  typeEditorByName = (type: inputType, name: string, text: string) => {
    const input = this.elements.editorByName(name).typeRandom(text, type);
    if (text) input.invoke('val').as(slug(name));
  };
  typeEditorHtmlByName = (type: inputType, name: string, text: string) => {
    const input = this.elements.editorHtmlByName(name).typeRandom(text, type);
    if (text) input.invoke('val').as(slug(name));
  };
  selectFileByName = (name: string, text: string) =>
    this.elements.fileByName(name).selectFile(
      text.split(',').map((item) => 'cypress/upload/' + item),
      { force: true },
    );
  typePickerInputByName = (name: string) =>
    this.elements.pickerInputByName(name).click().typeRandom('_RANDOM_', 'date');
  clickSwitchByName = (name: string) => this.elements.switchByName(name).click();
  clickRadioByName = (text: string, name: string) => this.elements.radioByName(name, text).click();
  clickSelectByName = (name: string, text: string) => {
    const handle = async (text: string | Promise<string>) => {
      const newText = await text;
      this.elements.selectByName(name).type(newText);
      window.scrollY > 0 && cy.scrollTo('top');
      cy.get(`.ant-select-item-option[title='${newText}']`).should('be.visible').click();
    };
    if (text.indexOf('_@') > -1 && text.indexOf('@_') > -1)
      handle(this.getTag(text.replace('_@', '').replace('@_', ''))).then();
    else handle(text).then();
    cy.wait(0);
  };
  verifyErrorByName = (name: string, text: string) => this.elements.errorByName(name).should('have.text', text);

  clickCheckboxWrapper = (list: string) => {
    list.split(', ').forEach((item: string) => this.elements.checkboxWrapper(item).click());
    this.elements.buttonRightTransfer().click();
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
    cy.wait(0);
  };
  clickTreeByName = (name: string) => {
    this.elements.spin();
    const hand = async () => {
      const val = await this.getTag(name);
      this.elements.treeByName(val.toString()).click();
    };
    hand().then();
    cy.wait(0);
  };
  clickRemoveTreeByName = (name: string) => {
    this.elements.spin();
    const hand = async () => {
      const val = await this.getTag(name);
      this.elements.removeTreeByName(val).click({ force: true });
    };
    hand().then();
    this.clickSubmitPopover();
    cy.wait(0);
  };
}
type inputType = 'text' | 'words' | 'number' | 'email' | 'percentage' | 'color' | 'phone';
