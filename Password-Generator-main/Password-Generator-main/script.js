const slider = document.querySelector('#slider');
const passLength = document.querySelector('#pass-length');
const copyBtn = document.querySelectorAll('.copy-btn');
const password = document.querySelector('#password');
const passwords = document.querySelectorAll('.password')
const generateBtn = document.querySelector('#generate-btn');
const deleteAllBtn = document.querySelector('#delete-all-btn');
const recents = document.querySelector('#recents');
const noItem = document.querySelector('#no-item');
var list = ['lowercase'];
var generated = [];
var recentsList = [];
var points = 0;


class settings {

    lowercase() {
        this.items = [
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
        ];
        this.points = [10];
    };
    uppercase() {
        this.items = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        ];
        this.points = [10];
    };
    numbers() {
        this.items = [
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
        ];
        this.points = [15];
    };
    symbols() {
        this.items = [
            '`', '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '=', '+', 
            '[', ']', '{', '}', ';', ':', '\'', '"', ',', '<', '.', '>', '/', '?', '\\', '|',
        ];
        this.points = [20];
    };
    duplicate() {

    };
    space() {
        this.items = [' '];
    };

};

const options = new settings();

slider.addEventListener('click', function() {

    passLength.innerHTML = `${slider.value}`;

});

const strength = () => {

    let strengthElem = document.querySelector('#power'); 
    let value = parseInt(slider.value);
    
    const configs = [
        { maxVal: 3, conditions: [{ maxPoints: Infinity, strength: 'Easy', color: 'red' }] },
        { maxVal: 5, conditions: [
            { maxPoints: 50, strength: 'Easy', color: 'red' },
            { maxPoints: 70, strength: 'Medium', color: 'blue' },
            { maxPoints: Infinity, strength: 'Hard', color: 'green' }
        ]},
        { maxVal: 7, conditions: [
            { maxPoints: 70, strength: 'Easy', color: 'red' },
            { maxPoints: 110, strength: 'Medium', color: 'blue' },
            { maxPoints: Infinity, strength: 'Hard', color: 'green' }
        ]},
        { maxVal: 9, conditions: [
            { maxPoints: 90, strength: 'Easy', color: 'red' },
            { maxPoints: 130, strength: 'Medium', color: 'blue' },
            { maxPoints: Infinity, strength: 'Hard', color: 'green' }
        ]},
        { maxVal: 11, conditions: [
            { maxPoints: 110, strength: 'Easy', color: 'red' },
            { maxPoints: 150, strength: 'Medium', color: 'blue' },
            { maxPoints: Infinity, strength: 'Hard', color: 'green' }
        ]},
        { maxVal: 13, conditions: [
            { maxPoints: 130, strength: 'Easy', color: 'red' },
            { maxPoints: 200, strength: 'Medium', color: 'blue' },
            { maxPoints: Infinity, strength: 'Hard', color: 'green' }
        ]},
        { maxVal: 15, conditions: [
            { maxPoints: 150, strength: 'Easy', color: 'red' },
            { maxPoints: 250, strength: 'Medium', color: 'blue' },
            { maxPoints: Infinity, strength: 'Hard', color: 'green' }
        ]},
        { maxVal: 17, conditions: [
            { maxPoints: 170, strength: 'Easy', color: 'red' },
            { maxPoints: 270, strength: 'Medium', color: 'blue' },
            { maxPoints: Infinity, strength: 'Hard', color: 'green' }
        ]},
        { maxVal: 19, conditions: [
            { maxPoints: 190, strength: 'Easy', color: 'red' },
            { maxPoints: 350, strength: 'Medium', color: 'blue' },
            { maxPoints: Infinity, strength: 'Hard', color: 'green' }
        ]},
        { maxVal: 21, conditions: [
            { maxPoints: 210, strength: 'Easy', color: 'red' },
            { maxPoints: 310, strength: 'Medium', color: 'blue' },
            { maxPoints: Infinity, strength: 'Hard', color: 'green' }
        ]},
        { maxVal: 23, conditions: [
            { maxPoints: 230, strength: 'Easy', color: 'red' },
            { maxPoints: 330, strength: 'Medium', color: 'blue' },
            { maxPoints: Infinity, strength: 'Hard', color: 'green' }
        ]},
        { maxVal: 25, conditions: [
            { maxPoints: 250, strength: 'Easy', color: 'red' },
            { maxPoints: 350, strength: 'Medium', color: 'blue' },
            { maxPoints: Infinity, strength: 'Hard', color: 'green' }
        ]}
    ];

    for (let config of configs) {
        if (value <= config.maxVal) {
            for (let condition of config.conditions) {
                if (points <= condition.maxPoints) {
                    strengthElem.innerText = condition.strength;
                    strengthElem.style.color = condition.color;
                    break;
                };
            };
            break;
        };
    };
    
};

strength();

const display = () => {

    if (recents.children.length > 0) {
        noItem.style.display = 'none';
        recents.style.display = 'block';
    } else {
        noItem.style.display = 'flex';
        recents.style.display = 'none';
    };
};

document.addEventListener('click', function(event) {
    if (event.target.closest('.copy-btn')) {
        const closestPassword = event.target.closest('li').querySelector('.password').innerText;
        navigator.clipboard.writeText(closestPassword);
    }
});

document.querySelector('#password + .copy-btn').addEventListener('click', function() {
    const mainPassword = document.querySelector('#password').innerText;
    navigator.clipboard.writeText(mainPassword);
});

document.addEventListener('click', function(event) {

    if (event.target.closest('.delete-btn')) {
        const deleteItem = event.target.closest('li');
        localStorage.removeItem(deleteItem.querySelector('.password').innerText);
        deleteItem.remove();
    };
    display();

});

document.addEventListener("DOMContentLoaded", function() { 

    const requiredCheckboxes = document.querySelectorAll('#options input[type="checkbox"][required]');

    requiredCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkedRequiredCheckboxes = document.querySelectorAll('#options input[type="checkbox"][required]:checked');

            if (checkedRequiredCheckboxes.length === 0) {
                document.getElementById('lowercase').checked = true;
            }
        });
    });

});

document.querySelector('#options').addEventListener('change', function(event) {

    const target = event.target;
    if (target.checked) {
        if (!list.includes(target.id)) {
            list.push(target.id);
        };
    } else {
        const index = list.indexOf(target.id);
        if (index > -1) {
            list.splice(index, 1);
        };
    };

});

generateBtn.addEventListener('click', function() {

    generated = [];
    points = 0;

    for (let i = 0; i < slider.value; i++) {
        const random = Math.floor(Math.random() * list.length);
        let val = list[random];
        eval('options.' + val + '()');

        const value = Math.floor(Math.random() * options.items.length);
        let finalVal = options.items[value];
        points += options.points[0];
        generated.push(finalVal);
    };

    generated = generated.join("");
    password.innerHTML = generated;
    let li = document.createElement('li');
    li.innerHTML = `<p class="password">${password.innerText}</p> <button class="copy-btn"><i class="fa-solid fa-copy"></i></button> <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>`;
    recents.insertBefore(li, recents.children[0]);
    let position = recents.children.length;
    localStorage.setItem(position, password.innerText);
    display();
    strength();

});


deleteAllBtn.addEventListener('click', function() {

    let i = recents.children.length;
    while (recents.firstChild) {
        recents.removeChild(recents.firstChild);
    }
    localStorage.clear();
    display();

});

