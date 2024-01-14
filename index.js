// class Tool {
//     constructor(name) {
//         this.name = name;
//         this.quantity = quantity;
//         this.category = category;
//         this.tools = [];
//     }

//     addTool(name, quantity, category) {
//         this.tools.push(new Tool(name, quantity, category));
//     }
// }



const TOOLS_URL = 'https://659d7119633f9aee79096f5e.mockapi.io/PTapi/tool';

async function getTools() {
    fetch(TOOLS_URL)
        .then(res => res.json())
        .then(data => console.log(data))
        .catch((error) => console.error('Error:', error))
}

getTools();

$.get(TOOLS_URL).then(data => {
    data.map(tool => {
        $('tbody').append(
            $(`
            <tr>
                <td>${tool.id}</td>
                <td>${tool.name}</td>
                <td>${tool.quantity}</td>
                <td>${tool.category}</td>
                <td>
                    <button onClick="deleteUer(${tool.id})" class="btn btn-danger">Delete</button>                    
            `)
        )
    })
})

