function addCourse() {
    var coursesTable = document.getElementById('courses');

    var newRow = coursesTable.insertRow(-1);

    var creditCell = newRow.insertCell(0);
    var creditInput = document.createElement('input');
    creditInput.type = 'number';
    creditInput.classList.add('credit-hours');
    creditInput.required = true;
    creditCell.appendChild(creditInput);

    var gradeCell = newRow.insertCell(1);
    var gradeInput = document.createElement('input');
    gradeInput.type = 'text';
    gradeInput.classList.add('grade');
    gradeInput.placeholder = 'A+, A, A-, etc.';
    gradeInput.required = true;
    gradeCell.appendChild(gradeInput);
}

document.getElementById('gpaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var creditHoursInputs = document.querySelectorAll('.credit-hours');
    var gradeInputs = document.querySelectorAll('.grade');

    var totalCredits = 0;
    var totalWeightedScore = 0;

    creditHoursInputs.forEach(function(input, index) {
        var creditHours = parseFloat(input.value);
        var grade = gradeInputs[index].value.toUpperCase();

        var gradeValue = convertGradeToValue(grade);

        if (!isNaN(creditHours) && gradeValue !== null) {
            totalCredits += creditHours;
            totalWeightedScore += creditHours * gradeValue;
        }
    });

    if (totalCredits > 0) {
        var gpa = totalWeightedScore / totalCredits;
        document.getElementById('result').textContent = 'Your GPA is: ' + gpa.toFixed(2);
    } else {
        document.getElementById('result').textContent = 'Please add at least one course.';
    }
});

function convertGradeToValue(grade) {
    var gpaScale = {
        'A+': 0.7,
        'A': 1,
        'A-': 1.3,
        'B+': 1.7,
        'B': 2,
        'B-': 2.3,
        'C+': 2.7,
        'C': 3,
        'C-': 3.3,
        'D+': 3.7,
        'D': 4,
        'F': 5
    };

    return gpaScale[grade];
}
