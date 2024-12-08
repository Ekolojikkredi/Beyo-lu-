// Kullanıcı kaydını yerel depolamada sakla
const registrationForm = document.getElementById('registration-form');
const studentDataKey = 'studentData';
const wasteDataKey = 'wasteData';

// Kayıt olan öğrencilerin bilgilerini depolayalım
registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('student-name').value;
    const surname = document.getElementById('student-surname').value;
    const email = document.getElementById('student-email').value;
    const number = document.getElementById('student-number').value;
    const className = document.getElementById('student-class').value;

    const student = { name, surname, email, number, className, wastePoints: 0 };

    // Öğrenciyi yerel depolamaya ekle
    let studentData = JSON.parse(localStorage.getItem(studentDataKey)) || [];
    studentData.push(student);
    localStorage.setItem(studentDataKey, JSON.stringify(studentData));

    alert('Öğrenci kaydedildi!');
    registrationForm.reset();
});

// Atık bilgilerini kaydet
const wasteForm = document.getElementById('waste-form');

wasteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const type = document.getElementById('waste-type').value;
    const weight = parseFloat(document.getElementById('waste-weight').value);

    // Atık ekle
    let wasteData = JSON.parse(localStorage.getItem(wasteDataKey)) || [];
    wasteData.push({ type, weight });
    localStorage.setItem(wasteDataKey, JSON.stringify(wasteData));

    // Öğrencinin kredi puanını güncelle
    let studentData = JSON.parse(localStorage.getItem(studentDataKey)) || [];
    const studentEmail = document.getElementById('student-email').value;
    const studentNumber = document.getElementById('student-number').value;

    const student = studentData.find(s => s.email === studentEmail && s.number === studentNumber);
    if (student) {
        student.wastePoints += weight * 10;  // Örnek: 1 kg atık = 10 kredi puanı
        localStorage.setItem(studentDataKey, JSON.stringify(studentData));
    }

    alert('Atık başarıyla eklendi!');
    wasteForm.reset();
});

// Verileri görüntüleme
const viewDataForm = document.getElementById('view-data-form');
const studentDataDisplay = document.getElementById('student-data');

viewDataForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('view-email').value;
    const number = document.getElementById('view-number').value;

    let studentData = JSON.parse(localStorage.getItem(studentDataKey)) || [];
    const student = studentData.find(s => s.email === email && s.number === number);

    if (student) {
        studentDataDisplay.innerHTML = `
            <p>Ad: ${student.name}</p>
            <p>Soyad: ${student.surname}</p>
            <p>Sınıf: ${student.className}</p>
            <p>Kredi Puanı: ${student.wastePoints}</p>
        `;
    } else {
        studentDataDisplay.innerHTML = '<p>Öğrenci bulunamadı.</p>';
    }
});
