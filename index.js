class Tool {
    //lists items that are part of the tool object
    constructor(name, quantity, category) {
        this.name = name;
        this.quantity = quantity;
        this.category = category;

    }
}

class ToolService {
    //API URL 
    static url = 'https://659d7119633f9aee79096f5e.mockapi.io/PTapi/tool';
    //gets all tools from API URL
    static getAllTools() {
        return $.get(this.url);
    }
    //gets a specific tool by id from API URL
    static getTool(id) {
        return $.get(this.url + `/${id}`);

    }
    //adds new tool to API tools
    static createTool(tool) {
        return $.post(this.url, tool);
    }
    //commented out as I could not get PUT method to work
    // static updateTool(tool) {
    //     return $.ajax({
    //         url: this.url + `/${id}`,
    //         dataType: 'json',
    //         data: JSON.stringify(tool),
    //         contentType: 'application/json',
    //         type: 'PUT'
    //     });
    // }

    //deletes tool from API by using the tool id
    static deleteTool(id) {
        return $.ajax({
            url: this.url + `/${id}`,
            type: 'DELETE'
        });
    }


}




class DOMManager {
    static tools;
    //function comes from calling get all tools from tool service to pull from API URL and
    //render to page
    static getAllTools() {
        ToolService.getAllTools().then(tools => this.render(tools));
    }
    //calls on method from ToolService to create new tool, updates API and renders
    static createTool(name, quantity, category) {
        ToolService.createTool(new Tool(name, quantity, category))
            .then(() => {
                return ToolService.getAllTools();
            })
            .then((tools) => this.render(tools));
    }
    // couldn't get update/PUT method to work on this project or in the lab either.  Since it
    // is not required for the assignment (it said delete OR update), I decided to comment it out
    //
    // static updateTool(tool) {
    //     ToolService.updateTool(tool)
    //         .then(() => {
    //             return ToolService.getAllTools();
    //         })
    //         .then((tools) => this.render(tools));
    // }
    //deletes tool from API
    static deleteTool(id) {
        ToolService.deleteTool(id)
            .then(() => {
                return ToolService.getAllTools();
            })
            .then((tools) => this.render(tools));
    }

    //this is for the table to show the list of tools.  Tools can be deleted with button.  Item does get
    //deleted, but doesn't show unless page is manually refreshed.  I tried adding a window.location.reload(), 
    //but this didn't solve the issue either.  

    static render(tools) {
        this.tools = tools;
        $('#app').empty();
        for (let tool of tools) {
            // $('#tool-list').append(
            $('tbody').append(
                $(`
                        <tr>
                            <td>${tool.id}</td>
                            <td>${tool.name}</td>
                            <td>${tool.quantity}</td>
                            <td>${tool.category}</td>
                            <td>
                            <button onClick="DOMManager.deleteTool(${tool.id})" class="btn btn-danger">Delete</button>                    
                     `)
            )
        }
    }
}
//creates a new tool  with user input and resets the input fields.  This works, but only upon page refresh.
//Unsure why this is happening this way
$('#add-kitchen-tool').on('click', function () {
    DOMManager.createTool($('#tool-name').val(), $('#tool-quantity').val(), $('#tool-category').val());
    $('#tool-name').val = "";
    $('#tool-quantity').val = "";
    $('#tool-category').val = "";
});
//commented out update function as it wasn't working
// $('#update-kitchen-tool').on('click', function () {
//     DOMManager.updateTool($('#tool-name').val(), $('#tool-quantity').val(), $('#tool-category').val());
//     $('#tool-name').val = "";
//     $('#tool-quantity').val = "";
//     $('#tool-category').val = "";
// });



DOMManager.getAllTools();