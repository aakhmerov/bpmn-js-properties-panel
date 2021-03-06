'use strict';

var TestHelper = require('../../../TestHelper');

var TestContainer = require('mocha-test-container-support');

/* global bootstrapModeler, inject */

var propertiesPanelModule = require('../../../../lib'),
    domQuery = require('min-dom/lib/query'),
    domClasses = require('min-dom/lib/classes'),
    coreModule = require('bpmn-js/lib/core'),
    selectionModule = require('diagram-js/lib/features/selection'),
    modelingModule = require('bpmn-js/lib/features/modeling'),
    propertiesProviderModule = require('../../../../lib/provider/camunda'),
    camundaModdlePackage = require('camunda-bpmn-moddle/resources/camunda'),
    getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject;

var extensionElementsHelper = require('../../../../lib/helper/ExtensionElementsHelper');

describe('fieldInjection - properties', function() {

  var diagramXML = require('./FieldInjection.bpmn');

  var testModules = [
    coreModule, selectionModule, modelingModule,
    propertiesPanelModule,
    propertiesProviderModule
  ];

  var container;

  beforeEach(function() {
    container = TestContainer.get(this);
  });

  beforeEach(bootstrapModeler(diagramXML, {
    modules: testModules,
    moddleExtensions: { camunda: camundaModdlePackage }
  }));


  beforeEach(inject(function(commandStack, propertiesPanel) {

    var undoButton = document.createElement('button');
    undoButton.textContent = 'UNDO';

    undoButton.addEventListener('click', function() {
      commandStack.undo();
    });

    container.appendChild(undoButton);

    propertiesPanel.attachTo(container);
  }));

  function getCamundaFields(bo) {
    return extensionElementsHelper.getExtensionElements(bo, 'camunda:Field') || [];
  }

  function getInput(container, inputNode) {
    return domQuery('div[data-entry=' + inputNode.dataEntry + '] input[name=' + inputNode.name + ']', container);
  }

  function getTextBox(container, inputNode) {
    return domQuery('div[data-entry=' + inputNode.dataEntry + '] div[name=' + inputNode.name + ']', container);
  }

  function getSelect(container, inputNode) {
    return domQuery('div[data-entry=' + inputNode.dataEntry + '] select[name=' + inputNode.name + ']', container);
  }

  function getAddButton(container, selector) {
    return domQuery('div[data-entry=' + selector + '] button[data-action=createElement]', container);
  }

  function getRemoveButton(container, selector) {
    return domQuery('div[data-entry=' + selector + '] button[data-action=removeElement]', container);
  }

  function selectCamundaField(container) {
    var camundaFields = getSelect(container, FIELDS_SELECT_ELEMENT);

    camundaFields.options[0].selected = 'selected';
    TestHelper.triggerEvent(camundaFields, 'change');
  }


  var FIELD_NAME_ELEMENT                = { dataEntry: 'field-name', name: 'fieldName' },
      FIELD_TYPE_ELEMENT                = { dataEntry: 'field-type', name: 'fieldType' },
      FIELD_VALUE_ELEMENT               = { dataEntry: 'field-value', name: 'fieldValue' },
      FIELDS_SELECT_ELEMENT             = { dataEntry: 'fields', name: 'selectedExtensionElement' };

  describe('get', function() {

    describe('#serviceTask', function() {

      var camundaField;

      beforeEach(inject(function(propertiesPanel, elementRegistry, selection) {
        var shape = elementRegistry.get('ServiceTask_1');
        selection.select(shape);

        var bo = getBusinessObject(shape);
        camundaField = getCamundaFields(bo)[0];

        selectCamundaField(propertiesPanel._container);

      }));


      it('name', inject(function(propertiesPanel) {

        var field = getInput(propertiesPanel._container, FIELD_NAME_ELEMENT);

        expect(field.value).to.equal(camundaField.get('name'));

      }));

      it('fieldType', inject(function(propertiesPanel) {

        var field = getSelect(propertiesPanel._container, FIELD_TYPE_ELEMENT);

        expect(field.value).to.equal('string');

      }));

      it('fieldValue', inject(function(propertiesPanel) {

        var field = getTextBox(propertiesPanel._container, FIELD_VALUE_ELEMENT);

        expect(field.textContent).to.equal(camundaField.get('string'));

      }));

    });

    describe('#businessRuleTask', function() {

      var camundaField;

      beforeEach(inject(function(propertiesPanel, elementRegistry, selection) {
        var shape = elementRegistry.get('BusinessRuleTask_1');
        selection.select(shape);

        var bo = getBusinessObject(shape);
        camundaField = getCamundaFields(bo)[0];

        selectCamundaField(propertiesPanel._container);

      }));


      it('name', inject(function(propertiesPanel) {

        var field = getInput(propertiesPanel._container, FIELD_NAME_ELEMENT);

        expect(field.value).to.equal(camundaField.get('name'));

      }));

      it('fieldType', inject(function(propertiesPanel) {

        var field = getSelect(propertiesPanel._container, FIELD_TYPE_ELEMENT);

        expect(field.value).to.equal('expression');

      }));

      it('fieldValue', inject(function(propertiesPanel) {

        var field = getTextBox(propertiesPanel._container, FIELD_VALUE_ELEMENT);

        expect(field.textContent).to.equal(camundaField.get('expression'));

      }));


    });


    describe('#sendTask', function() {

      var camundaField;

      beforeEach(inject(function(propertiesPanel, elementRegistry, selection) {
        var shape = elementRegistry.get('SendTask_1');
        selection.select(shape);

        var bo = getBusinessObject(shape);
        camundaField = getCamundaFields(bo)[0];

        selectCamundaField(propertiesPanel._container);

      }));


      it('name', inject(function(propertiesPanel) {

        var field = getInput(propertiesPanel._container, FIELD_NAME_ELEMENT);

        expect(field.value).to.equal(camundaField.get('name'));

      }));

      it('fieldType', inject(function(propertiesPanel) {

        var field = getSelect(propertiesPanel._container, FIELD_TYPE_ELEMENT);

        expect(field.value).to.equal('string');

      }));

      it('fieldValue', inject(function(propertiesPanel) {

        var field = getTextBox(propertiesPanel._container, FIELD_VALUE_ELEMENT);

        expect(field.textContent).to.equal(camundaField.get('string'));

      }));


    });


    describe('#intermediateThrowEvent', function() {

      var camundaField;

      beforeEach(inject(function(propertiesPanel, elementRegistry, selection) {
        var shape = elementRegistry.get('IntermediateThrowEvent_1');
        selection.select(shape);

        var bo = getBusinessObject(shape);
        camundaField = getCamundaFields(bo)[0];

        selectCamundaField(propertiesPanel._container);

      }));


      it('name', inject(function(propertiesPanel) {

        var field = getInput(propertiesPanel._container, FIELD_NAME_ELEMENT);

        expect(field.value).to.equal(camundaField.get('name'));

      }));

      it('fieldType', inject(function(propertiesPanel) {

        var field = getSelect(propertiesPanel._container, FIELD_TYPE_ELEMENT);

        expect(field.value).to.equal('string');

      }));

      it('fieldValue', inject(function(propertiesPanel) {

        var field = getTextBox(propertiesPanel._container, FIELD_VALUE_ELEMENT);

        expect(field.textContent).to.equal(camundaField.get('string'));

      }));

    });


    describe('#endEvent', function() {

      var camundaField;

      beforeEach(inject(function(propertiesPanel, elementRegistry, selection) {
        var shape = elementRegistry.get('EndEvent_Invalid');
        selection.select(shape);

        var bo = getBusinessObject(shape);
        camundaField = getCamundaFields(bo)[0];

        selectCamundaField(propertiesPanel._container);

      }));


      it('name', inject(function(propertiesPanel) {

        var field = getInput(propertiesPanel._container, FIELD_NAME_ELEMENT);

        expect(field.value).to.equal(camundaField.get('name'));

      }));

      it('fieldType', inject(function(propertiesPanel) {

        var field = getSelect(propertiesPanel._container, FIELD_TYPE_ELEMENT);

        expect(field.value).to.equal('string');

      }));

      it('fieldValue', inject(function(propertiesPanel) {

        var field = getTextBox(propertiesPanel._container, FIELD_VALUE_ELEMENT);

        expect(field.textContent).to.equal('');
        expect(camundaField.get('string')).to.be.undefined;

      }));

    });


  });


  describe('set', function() {

    describe('#serviceTask', function() {

      var camundaField;

      beforeEach(inject(function(propertiesPanel, elementRegistry, selection) {
        var shape = elementRegistry.get('ServiceTask_1');
        selection.select(shape);

        var bo = getBusinessObject(shape);
        camundaField = getCamundaFields(bo)[0];

        selectCamundaField(propertiesPanel._container);

      }));

      describe('#name', function() {

        var field;

        beforeEach(inject(function(propertiesPanel) {

          field = getInput(propertiesPanel._container, FIELD_NAME_ELEMENT);

          TestHelper.triggerValue(field, 'FOO', 'change');

        }));

        describe('in the DOM', function() {

          it('should execute', function() {
            expect(field.value).to.equal('FOO');
          });

          it('should undo', inject(function(commandStack) {

            commandStack.undo();

            expect(field.value).to.equal('Field_1');
          }));

          it('should redo', inject(function(commandStack) {

            commandStack.undo();
            commandStack.redo();

            expect(field.value).to.equal('FOO');

          }));

        });

        describe('on the business object', function() {

          it('should execute', function() {
            expect(camundaField.get('name')).to.equal('FOO');
          });

          it('should undo', inject(function(commandStack) {

            commandStack.undo();

            expect(camundaField.get('name')).to.equal('Field_1');
          }));

          it('should redo', inject(function(commandStack) {

            commandStack.undo();
            commandStack.redo();

            expect(camundaField.get('name')).to.equal('FOO');

          }));

        });

      });

      describe('#fieldType', function() {

        var field;

        beforeEach(inject(function(propertiesPanel) {

          field = getSelect(propertiesPanel._container, FIELD_TYPE_ELEMENT);

          // select 'expression'
          field.options[1].selected = 'selected';
          TestHelper.triggerEvent(field, 'change');

        }));

        describe('in the DOM', function() {

          it('should execute', function() {
            expect(field.value).to.equal('expression');
          });

          it('should undo', inject(function(commandStack) {

            commandStack.undo();

            expect(field.value).to.equal('string');
          }));

          it('should redo', inject(function(commandStack) {

            commandStack.undo();
            commandStack.redo();

            expect(field.value).to.equal('expression');

          }));

        });

        describe('on the business object', function() {

          it('should execute', function() {
            expect(camundaField.get('string')).to.be.undefined;
            expect(camundaField.get('expression')).to.be.defined;
          });

          it('should undo', inject(function(commandStack) {

            commandStack.undo();

            expect(camundaField.get('string')).to.be.defined;
            expect(camundaField.get('expression')).to.be.undefined;
          }));

          it('should redo', inject(function(commandStack) {

            commandStack.undo();
            commandStack.redo();

            expect(camundaField.get('string')).to.be.undefined;
            expect(camundaField.get('expression')).to.be.defined;
          }));

        });

      });

      describe('#fieldValue', function() {

        var field;

        beforeEach(inject(function(propertiesPanel) {
          field = getTextBox(propertiesPanel._container, FIELD_VALUE_ELEMENT);

          TestHelper.triggerValue(field, 'FOO', 'change');

        }));

        describe('in the DOM', function() {

          it('should execute', function() {
            expect(field.textContent).to.equal('FOO');
          });

          it('should undo', inject(function(commandStack) {

            commandStack.undo();

            expect(field.textContent).to.equal('myStringValue');
          }));

          it('should redo', inject(function(commandStack) {

            commandStack.undo();
            commandStack.redo();

            expect(field.textContent).to.equal('FOO');

          }));

        });

        describe('on the business object', function() {

          it('should execute', function() {
            expect(camundaField.get('string')).to.equal('FOO');
          });

          it('should undo', inject(function(commandStack) {

            commandStack.undo();

            expect(camundaField.get('string')).to.equal('myStringValue');
          }));

          it('should redo', inject(function(commandStack) {

            commandStack.undo();
            commandStack.redo();

            expect(camundaField.get('string')).to.equal('FOO');
          }));

        });

      });


    });


    describe('#endEvent', function() {

      var camundaField;

      beforeEach(inject(function(propertiesPanel, elementRegistry, selection) {
        var shape = elementRegistry.get('EndEvent_Invalid');
        selection.select(shape);

        var bo = getBusinessObject(shape);
        camundaField = getCamundaFields(bo)[0];

        selectCamundaField(propertiesPanel._container);

      }));

      describe('#name', function() {

        var field;

        beforeEach(inject(function(propertiesPanel) {
          field = getInput(propertiesPanel._container, FIELD_NAME_ELEMENT);

          TestHelper.triggerValue(field, 'FOO', 'change');

        }));

        describe('in the DOM', function() {

          it('should execute', function() {
            expect(field.value).to.equal('FOO');
          });

          it('should undo', inject(function(commandStack) {

            commandStack.undo();

            expect(field.value).to.equal('');
          }));

          it('should redo', inject(function(commandStack) {

            commandStack.undo();
            commandStack.redo();

            expect(field.value).to.equal('FOO');

          }));

        });

        describe('on the business object', function() {

          it('should execute', function() {
            expect(camundaField.get('name')).to.equal('FOO');
          });

          it('should undo', inject(function(commandStack) {

            commandStack.undo();

            expect(camundaField.get('name')).to.equal('');
          }));

          it('should redo', inject(function(commandStack) {

            commandStack.undo();
            commandStack.redo();

            expect(camundaField.get('name')).to.equal('FOO');

          }));

        });

      });

      describe('#fieldType', function() {

        var field;

        beforeEach(inject(function(propertiesPanel) {
          field = getSelect(propertiesPanel._container, FIELD_TYPE_ELEMENT);

          // select 'expression'
          field.options[1].selected = 'selected';
          TestHelper.triggerEvent(field, 'change');

        }));

        describe('in the DOM', function() {

          it('should execute', function() {
            expect(field.value).to.equal('expression');
          });

          it('should undo', inject(function(commandStack) {

            commandStack.undo();

            expect(field.value).to.equal('string');
          }));

          it('should redo', inject(function(commandStack) {

            commandStack.undo();
            commandStack.redo();

            expect(field.value).to.equal('expression');

          }));

        });

        describe('on the business object', function() {

          it('should execute', function() {
            expect(camundaField.get('string')).to.be.undefined;
            expect(camundaField.get('expression')).to.be.defined;
          });

          it('should undo', inject(function(commandStack) {

            commandStack.undo();

            expect(camundaField.get('string')).to.be.defined;
            expect(camundaField.get('expression')).to.be.undefined;
          }));

          it('should redo', inject(function(commandStack) {

            commandStack.undo();
            commandStack.redo();

            expect(camundaField.get('string')).to.be.undefined;
            expect(camundaField.get('expression')).to.be.defined;
          }));

        });

      });

      describe('#fieldValue', function() {

        var field;

        beforeEach(inject(function(propertiesPanel) {
          field = getTextBox(propertiesPanel._container, FIELD_VALUE_ELEMENT);

          TestHelper.triggerValue(field, 'FOO', 'change');

        }));

        describe('in the DOM', function() {

          it('should execute', function() {
            expect(field.textContent).to.equal('FOO');
          });

          it('should undo', inject(function(commandStack) {

            commandStack.undo();

            expect(field.textContent).to.equal('');
          }));

          it('should redo', inject(function(commandStack) {

            commandStack.undo();
            commandStack.redo();

            expect(field.textContent).to.equal('FOO');

          }));

        });

        describe('on the business object', function() {

          it('should execute', function() {
            expect(camundaField.get('string')).to.equal('FOO');
          });

          it('should undo', inject(function(commandStack) {

            commandStack.undo();

            expect(camundaField.get('string')).be.undefined;
          }));

          it('should redo', inject(function(commandStack) {

            commandStack.undo();
            commandStack.redo();

            expect(camundaField.get('string')).to.equal('FOO');
          }));

        });

      });


    });


  });


  describe('add camunda:field', function() {

    describe('#intermediateThrowEvent', function() {

      var bo;

      beforeEach(inject(function(propertiesPanel, elementRegistry, selection) {
        var shape = elementRegistry.get('IntermediateThrowEvent_Empty');
        selection.select(shape);

        bo = getBusinessObject(shape);

        var button = getAddButton(propertiesPanel._container, 'fields');

        TestHelper.triggerEvent(button, 'click');

      }));

      describe('in the DOM', function() {

        it('should execute', inject(function(propertiesPanel) {
          var field = getSelect(propertiesPanel._container, FIELDS_SELECT_ELEMENT);
          expect(field.options).to.have.length.of(1);
        }));

        it('should undo', inject(function(commandStack, propertiesPanel) {

          commandStack.undo();

          var field = getSelect(propertiesPanel._container, FIELDS_SELECT_ELEMENT);
          expect(field.options).to.have.length.of(0);
        }));

        it('should redo', inject(function(commandStack, propertiesPanel) {

          commandStack.undo();
          commandStack.redo();

          var field = getSelect(propertiesPanel._container, FIELDS_SELECT_ELEMENT);
          expect(field.options).to.have.length.of(1);

        }));

      });

      describe('on the business object', function() {

        it('should execute', function() {
          var camundaField = getCamundaFields(bo);
          expect(camundaField).to.have.length.of(1);
        });

        it('should undo', inject(function(commandStack) {

          commandStack.undo();

          var camundaField = getCamundaFields(bo);
          expect(camundaField).to.have.length.of(0);
        }));

        it('should redo', inject(function(commandStack) {

          commandStack.undo();
          commandStack.redo();

          var camundaField = getCamundaFields(bo);
          expect(camundaField).to.have.length.of(1);
        }));

      });

    });


    describe('#serviceTask', function() {

      var bo;

      beforeEach(inject(function(propertiesPanel, elementRegistry, selection) {
        var shape = elementRegistry.get('ServiceTask_1');
        selection.select(shape);

        bo = getBusinessObject(shape);

        var button = getAddButton(propertiesPanel._container, 'fields');

        TestHelper.triggerEvent(button, 'click');

      }));

      describe('in the DOM', function() {

        it('should execute', inject(function(propertiesPanel) {
          var field = getSelect(propertiesPanel._container, FIELDS_SELECT_ELEMENT);
          expect(field.options).to.have.length.of(2);
        }));

        it('should undo', inject(function(commandStack, propertiesPanel) {

          commandStack.undo();

          var field = getSelect(propertiesPanel._container, FIELDS_SELECT_ELEMENT);
          expect(field.options).to.have.length.of(1);
        }));

        it('should redo', inject(function(commandStack, propertiesPanel) {

          commandStack.undo();
          commandStack.redo();

          var field = getSelect(propertiesPanel._container, FIELDS_SELECT_ELEMENT);
          expect(field.options).to.have.length.of(2);

        }));

      });

      describe('on the business object', function() {

        it('should execute', function() {
          var camundaField = getCamundaFields(bo);
          expect(camundaField).to.have.length.of(2);
        });

        it('should undo', inject(function(commandStack) {

          commandStack.undo();

          var camundaField = getCamundaFields(bo);
          expect(camundaField).to.have.length.of(1);
        }));

        it('should redo', inject(function(commandStack) {

          commandStack.undo();
          commandStack.redo();

          var camundaField = getCamundaFields(bo);
          expect(camundaField).to.have.length.of(2);
        }));

      });

    });


    describe('#endEvent', function() {

      var bo;

      beforeEach(inject(function(propertiesPanel, elementRegistry, selection) {
        var shape = elementRegistry.get('EndEvent_Invalid');
        selection.select(shape);

        bo = getBusinessObject(shape);

        var button = getAddButton(propertiesPanel._container, 'fields');

        TestHelper.triggerEvent(button, 'click');

      }));

      describe('in the DOM', function() {

        it('should execute', inject(function(propertiesPanel) {
          var field = getSelect(propertiesPanel._container, FIELDS_SELECT_ELEMENT);
          expect(field.options).to.have.length.of(2);
        }));

        it('should undo', inject(function(commandStack, propertiesPanel) {

          commandStack.undo();

          var field = getSelect(propertiesPanel._container, FIELDS_SELECT_ELEMENT);
          expect(field.options).to.have.length.of(1);
        }));

        it('should redo', inject(function(commandStack, propertiesPanel) {

          commandStack.undo();
          commandStack.redo();

          var field = getSelect(propertiesPanel._container, FIELDS_SELECT_ELEMENT);
          expect(field.options).to.have.length.of(2);

        }));

      });

      describe('on the business object', function() {

        it('should execute', function() {
          var camundaField = getCamundaFields(bo);
          expect(camundaField).to.have.length.of(2);
        });

        it('should undo', inject(function(commandStack) {

          commandStack.undo();

          var camundaField = getCamundaFields(bo);
          expect(camundaField).to.have.length.of(1);
        }));

        it('should redo', inject(function(commandStack) {

          commandStack.undo();
          commandStack.redo();

          var camundaField = getCamundaFields(bo);
          expect(camundaField).to.have.length.of(2);
        }));

      });

    });


  });


  describe('remove camunda:field', function() {

    describe('#serviceTask', function() {

      var bo;

      beforeEach(inject(function(propertiesPanel, elementRegistry, selection) {
        var shape = elementRegistry.get('ServiceTask_1');
        selection.select(shape);

        bo = getBusinessObject(shape);

        var button = getRemoveButton(propertiesPanel._container, 'fields');

        selectCamundaField(propertiesPanel._container);

        TestHelper.triggerEvent(button, 'click');

      }));

      describe('in the DOM', function() {

        it('should execute', inject(function(propertiesPanel) {
          var field = getSelect(propertiesPanel._container, FIELDS_SELECT_ELEMENT);
          expect(field.options).to.have.length.of(0);
        }));

        it('should undo', inject(function(commandStack, propertiesPanel) {

          commandStack.undo();

          var field = getSelect(propertiesPanel._container, FIELDS_SELECT_ELEMENT);
          expect(field.options).to.have.length.of(1);
        }));

        it('should redo', inject(function(commandStack, propertiesPanel) {

          commandStack.undo();
          commandStack.redo();

          var field = getSelect(propertiesPanel._container, FIELDS_SELECT_ELEMENT);
          expect(field.options).to.have.length.of(0);

        }));

      });

      describe('on the business object', function() {

        it('should execute', function() {
          var camundaField = getCamundaFields(bo);
          expect(camundaField).to.have.length.of(0);
        });

        it('should undo', inject(function(commandStack) {

          commandStack.undo();

          var camundaField = getCamundaFields(bo);
          expect(camundaField).to.have.length.of(1);
        }));

        it('should redo', inject(function(commandStack) {

          commandStack.undo();
          commandStack.redo();

          var camundaField = getCamundaFields(bo);
          expect(camundaField).to.have.length.of(0);
        }));

      });

    });

    describe('#sendTask', function() {

      var bo;

      beforeEach(inject(function(propertiesPanel, elementRegistry, selection) {
        var shape = elementRegistry.get('SendTask_Two_Fields');
        selection.select(shape);

        bo = getBusinessObject(shape);

        var button = getRemoveButton(propertiesPanel._container, 'fields');

        selectCamundaField(propertiesPanel._container);

        TestHelper.triggerEvent(button, 'click');

      }));

      describe('in the DOM', function() {

        it('should execute', inject(function(propertiesPanel) {
          var field = getSelect(propertiesPanel._container, FIELDS_SELECT_ELEMENT);
          expect(field.options).to.have.length.of(1);
        }));

        it('should undo', inject(function(commandStack, propertiesPanel) {

          commandStack.undo();

          var field = getSelect(propertiesPanel._container, FIELDS_SELECT_ELEMENT);
          expect(field.options).to.have.length.of(2);
        }));

        it('should redo', inject(function(commandStack, propertiesPanel) {

          commandStack.undo();
          commandStack.redo();

          var field = getSelect(propertiesPanel._container, FIELDS_SELECT_ELEMENT);
          expect(field.options).to.have.length.of(1);

        }));

      });

      describe('on the business object', function() {

        it('should execute', function() {
          var camundaField = getCamundaFields(bo);
          expect(camundaField).to.have.length.of(1);
        });

        it('should undo', inject(function(commandStack) {

          commandStack.undo();

          var camundaField = getCamundaFields(bo);
          expect(camundaField).to.have.length.of(2);
        }));

        it('should redo', inject(function(commandStack) {

          commandStack.undo();
          commandStack.redo();

          var camundaField = getCamundaFields(bo);
          expect(camundaField).to.have.length.of(1);
        }));

      });

    });


  });


  describe('validation errors', function() {

    beforeEach(inject(function(elementRegistry, selection, propertiesPanel) {

      var item = elementRegistry.get('EndEvent_Invalid');
      selection.select(item);

      selectCamundaField(propertiesPanel._container);

    }));

    it('should be shown if the name field is empty', inject(function(propertiesPanel) {

      var field = getInput(propertiesPanel._container, FIELD_NAME_ELEMENT);

      expect(domClasses(field).has('invalid')).to.be.true;

    }));

    it('should be shown if fieldType selected and no fieldValue is empty', inject(function(propertiesPanel) {

      var fieldType = getSelect(propertiesPanel._container, FIELD_TYPE_ELEMENT);
      var fieldValue = getTextBox(propertiesPanel._container, FIELD_VALUE_ELEMENT);

      expect(fieldType.value).to.equal('string');
      expect(domClasses(fieldValue).has('invalid')).to.be.true;

    }));


  });


  describe('control visibility', function() {

    function expectVisible(visible, getter, inputNode, parentElement) {

      return inject(function(propertiesPanel, selection, elementRegistry) {

        var field = getter(propertiesPanel._container, inputNode);

        if (parentElement) {
          field = field.parentElement;
        }

        // then
        if (visible) {
          expect(field).to.exist;
        } else {
          expect(domClasses(field).has('bpp-hidden')).to.be.true;
        }
      });
    }

    describe('should show', function() {

      beforeEach(inject(function(elementRegistry, selection, propertiesPanel) {

        var item = elementRegistry.get('ServiceTask_1');
        selection.select(item);

        selectCamundaField(propertiesPanel._container);

      }));

      it('fieldName', expectVisible(true, getInput, FIELD_NAME_ELEMENT));
      it('fieldType', expectVisible(true, getSelect, FIELD_TYPE_ELEMENT));
      it('fieldValue', expectVisible(true, getTextBox, FIELD_VALUE_ELEMENT));

    });

    describe('should hide', function() {

      beforeEach(inject(function(elementRegistry, selection, propertiesPanel) {

        var item = elementRegistry.get('ServiceTask_1');
        selection.select(item);

      }));

      it('fieldName', expectVisible(false, getInput, FIELD_NAME_ELEMENT, true));
      it('fieldType', expectVisible(false, getSelect, FIELD_TYPE_ELEMENT));
      it('fieldValue', expectVisible(false, getTextBox, FIELD_VALUE_ELEMENT, true));

    });

  });


});
