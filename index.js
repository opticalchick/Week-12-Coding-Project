class ToolType {
    constructor(name) {
        this.name = name;
        this.tools = [];
    }

    addTool(name, quantity) {
        this.tools.push(new Tool(name, quantity));
    }
}

class Tool {
    constructor(name, quantity) {
        this.name = name;
        this.quantity = quantity;
    }
}

class ToolTypeService {
    static url = 'https://659d7119633f9aee79096f5e.mockapi.io/PTapi/toolTypes';

    static getAllToolTypes() {
        return $.get(this.url);
    }

    static getToolType(id) {
        return $.get(this.url + `${id}`);
    }

    static createToolType(toolType) {
        return $.post(this.url, toolType);
    }

    static updateToolType(toolType) {
        return $.ajax({
            url: this.url + '/${toolType.id}',
            dataType: 'json',
            data: JSON.stringify(toolType),
            contentType: 'application/json',
            type: 'PUT'
        });
    }

    static deleteToolType(id) {
        return $.ajax({
            url: this.url + '/${id}',
            type: 'DELETE'
        });
    }
}

class DOMManager {
    static toolType;

    static getAllToolTypes() {
        ToolTypeService.getAllToolTypes().then(toolTypes => this.render(toolTypes));
    }

    static render(toolTypes) {
        this.toolTypes = toolTypes;
        $('#app').empty();
        for (let toolType of toolTypes) {
            $('#app').append(
                ` <div id="${toolType.id}" class="card bg-light">
                    <div class="card-header text-center">
                        <h3>${toolType.name}</h3>
                        <button class="btn btn-danger" onclick="DOMManager.deleteToolType('${toolType.id}')">Delete</button>
                    </div>
                    <div class="card-body">
                        <div class="card">
                            <div class="row">
                                <div class="col-sm">
                                <input type="text" id="${toolType.id}-tool-name" class="form-control" placeholder="Tool Name">
                                </div>
                                <div class="col-sm">
                                <input type="text" id="${toolType.id}-tool-quantity" class="form-control" placeholder="Quantity">
                                </div>
                            </div>
                            <br>
                            <button id="${toolType.id}-new-tool" onclick="DOMManager.addTool('${toolType.id}')" class="btn btn-info ">Add Tool</button>
                        </div>
                    </div>
                  </div>
                  <br>`
            );
            for (left tool of toolType.)
        }
    }
}

DOMManager.getAllToolTypes();