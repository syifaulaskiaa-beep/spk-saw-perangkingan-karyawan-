// Data storage
let criteria = [];
let employees = [];
let calculationResults = null;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeDefaultCriteria();
    renderCriteriaList();
});

// Initialize default criteria
function initializeDefaultCriteria() {
    criteria = [
        { id: 1, name: 'Pengalaman Kerja (Tahun)', type: 'benefit', weight: 20 },
        { id: 2, name: 'Kemampuan Teknis', type: 'benefit', weight: 25 },
        { id: 3, name: 'Soft Skills', type: 'benefit', weight: 20 },
        { id: 4, name: 'Presensi', type: 'benefit', weight: 15 },
        { id: 5, name: 'Usia (Tahun)', type: 'cost', weight: 20 }
    ];
}

// Scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Switch tabs
function switchTab(tabName) {
    // Hide all tabs
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(tab => tab.classList.remove('active'));

    // Remove active class from all buttons
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => btn.classList.remove('active'));

    // Show selected tab
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Add active class to clicked button
    event.target.classList.add('active');

    // Render employee form when switching to data tab
    if (tabName === 'data') {
        renderEmployeeForm();
    }
}

// Render criteria list
function renderCriteriaList() {
    const criteriaList = document.getElementById('criteriaList');
    criteriaList.innerHTML = '';

    criteria.forEach((crit, index) => {
        const criteriaItem = document.createElement('div');
        criteriaItem.className = 'criteria-item';
        criteriaItem.innerHTML = `
            <div class="form-group">
                <label>Nama Kriteria</label>
                <input type="text" value="${crit.name}" onchange="updateCriteria(${index}, 'name', this.value)">
            </div>
            <div class="form-group">
                <label>Tipe Kriteria</label>
                <select onchange="updateCriteria(${index}, 'type', this.value)">
                    <option value="benefit" ${crit.type === 'benefit' ? 'selected' : ''}>Benefit (↑ semakin baik)</option>
                    <option value="cost" ${crit.type === 'cost' ? 'selected' : ''}>Cost (↓ semakin baik)</option>
                </select>
            </div>
            <div class="form-group">
                <label>Bobot (%)</label>
                <input type="number" value="${crit.weight}" min="1" max="100" onchange="updateCriteria(${index}, 'weight', parseFloat(this.value))">
            </div>
            <button class="btn-remove" onclick="removeCriteria(${index})">Hapus</button>
        `;
        criteriaList.appendChild(criteriaItem);
    });

    // Update total weight display
    updateWeightDisplay();
}

// Update weight display
function updateWeightDisplay() {
    const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0);
    const weightInfo = document.querySelector('.weight-info');
    
    if (totalWeight !== 100) {
        if (!weightInfo) {
            const info = document.createElement('div');
            info.className = 'weight-info';
            info.style.cssText = 'background: #fff3cd; padding: 10px; border-radius: 4px; margin-top: 15px; color: #856404;';
            info.textContent = `⚠️ Total Bobot: ${totalWeight.toFixed(1)}% (harus 100%)`;
            document.getElementById('criteriaList').appendChild(info);
        } else {
            weightInfo.textContent = `⚠️ Total Bobot: ${totalWeight.toFixed(1)}% (harus 100%)`;
        }
    } else {
        if (weightInfo) {
            weightInfo.style.display = 'none';
        }
    }
}

// Add criteria
function addCriteria() {
    const newId = Math.max(...criteria.map(c => c.id), 0) + 1;
    criteria.push({
        id: newId,
        name: 'Kriteria Baru',
        type: 'benefit',
        weight: 10
    });
    renderCriteriaList();
}

// Update criteria
function updateCriteria(index, field, value) {
    criteria[index][field] = value;
    if (field === 'weight') {
        updateWeightDisplay();
    }
}

// Remove criteria
function removeCriteria(index) {
    if (criteria.length > 1) {
        criteria.splice(index, 1);
        renderCriteriaList();
    } else {
        alert('Minimal harus ada 1 kriteria!');
    }
}

// Render employee form
function renderEmployeeForm() {
    const employeeForm = document.getElementById('employeeForm');
    
    if (employees.length === 0) {
        employeeForm.innerHTML = '<p style="text-align: center; color: #7f8c8d;">Belum ada data karyawan. Klik tombol "Tambah Karyawan" untuk memulai.</p>';
        return;
    }

    employeeForm.innerHTML = '';
    employees.forEach((emp, empIndex) => {
        const employeeItem = document.createElement('div');
        employeeItem.className = 'employee-item';
        
        let inputsHTML = `<h4>Karyawan ${empIndex + 1}</h4>`;
        inputsHTML += `
            <div class="form-group">
                <label>Nama Karyawan</label>
                <input type="text" value="${emp.name}" onchange="updateEmployee(${empIndex}, 'name', this.value)">
            </div>
        `;

        criteria.forEach((crit, critIndex) => {
            inputsHTML += `
                <div class="form-group">
                    <label>${crit.name}</label>
                    <input type="number" step="0.01" value="${emp.scores[critIndex] || 0}" onchange="updateEmployee(${empIndex}, 'score', ${critIndex}, parseFloat(this.value))">
                </div>
            `;
        });

        employeeItem.innerHTML = inputsHTML;
        const removeBtn = document.createElement('button');
        removeBtn.className = 'btn-remove';
        removeBtn.textContent = 'Hapus Karyawan';
        removeBtn.onclick = () => removeEmployee(empIndex);
        employeeItem.appendChild(removeBtn);

        employeeForm.appendChild(employeeItem);
    });
}

// Add employee
function addEmployee() {
    employees.push({
        name: `Karyawan ${employees.length + 1}`,
        scores: new Array(criteria.length).fill(0)
    });
    renderEmployeeForm();
}

// Update employee
function updateEmployee(empIndex, field, critIndexOrValue, value) {
    if (field === 'name') {
        employees[empIndex].name = critIndexOrValue;
    } else if (field === 'score') {
        employees[empIndex].scores[critIndexOrValue] = value;
    }
}

// Remove employee
function removeEmployee(index) {
    if (employees.length > 1) {
        employees.splice(index, 1);
        renderEmployeeForm();
    } else {
        alert('Minimal harus ada 1 karyawan!');
    }
}

// Calculate SAW
function calculateSAW() {
    // Validate
    const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0);
    if (Math.abs(totalWeight - 100) > 0.01) {
        alert(`❌ Total bobot harus 100%, saat ini: ${totalWeight.toFixed(1)}%`);
        return;
    }

    if (employees.length === 0) {
        alert('❌ Tambahkan minimal 1 karyawan!');
        return;
    }

    // Check if all employees have scores
    for (let emp of employees) {
        if (emp.scores.some(score => score === 0 || score === null)) {
            alert('❌ Semua karyawan harus memiliki nilai untuk setiap kriteria!');
            return;
        }
    }

    // Calculate
    calculationResults = performSAWCalculation();
    
    // Display results
    displayResults();
    switchTab('hasil');
}

// Perform SAW calculation
function performSAWCalculation() {
    const results = {
        criteria: criteria,
        employees: employees,
        normalizedMatrix: [],
        scores: [],
        ranking: []
    };

    // Step 1: Normalize matrix
    for (let c = 0; c < criteria.length; c++) {
        const criterion = criteria[c];
        const scores = employees.map(emp => emp.scores[c]);
        const maxScore = Math.max(...scores);
        const minScore = Math.min(...scores);

        for (let e = 0; e < employees.length; e++) {
            if (!results.normalizedMatrix[e]) {
                results.normalizedMatrix[e] = [];
            }

            if (criterion.type === 'benefit') {
                results.normalizedMatrix[e][c] = scores[e] / maxScore;
            } else {
                results.normalizedMatrix[e][c] = minScore / scores[e];
            }
        }
    }

    // Step 2: Calculate preference scores
    for (let e = 0; e < employees.length; e++) {
        let score = 0;
        for (let c = 0; c < criteria.length; c++) {
            const weight = criteria[c].weight / 100;
            score += weight * results.normalizedMatrix[e][c];
        }
        results.scores.push({
            employee: employees[e].name,
            score: score
        });
    }

    // Step 3: Ranking
    results.ranking = [...results.scores]
        .sort((a, b) => b.score - a.score)
        .map((item, index) => ({
            rank: index + 1,
            employee: item.employee,
            score: item.score
        }));

    return results;
}

// Display results
function displayResults() {
    if (!calculationResults) return;

    // Display normalized matrix
    displayNormalizedMatrix();

    // Display score calculation
    displayScoreCalculation();

    // Display ranking
    displayRanking();
}

// Display normalized matrix
function displayNormalizedMatrix() {
    const container = document.getElementById('normalizedMatrix');
    
    let html = '<table><thead><tr><th>Karyawan</th>';
    calculationResults.criteria.forEach(crit => {
        html += `<th>${crit.name}</th>`;
    });
    html += '</tr></thead><tbody>';

    calculationResults.employees.forEach((emp, index) => {
        html += `<tr><td><strong>${emp.name}</strong></td>`;
        calculationResults.normalizedMatrix[index].forEach(value => {
            html += `<td>${value.toFixed(4)}</td>`;
        });
        html += '</tr>';
    });

    html += '</tbody></table>';
    container.innerHTML = html;
}

// Display score calculation
function displayScoreCalculation() {
    const container = document.getElementById('scoreCalculation');
    
    let html = '<table><thead><tr><th>Karyawan</th>';
    calculationResults.criteria.forEach(crit => {
        html += `<th>${crit.name}<br/>(w=${crit.weight}%)</th>`;
    });
    html += '<th>Skor Total</th></tr></thead><tbody>';

    calculationResults.employees.forEach((emp, index) => {
        html += `<tr><td><strong>${emp.name}</strong></td>`;
        let totalScore = 0;
        calculationResults.criteria.forEach((crit, critIndex) => {
            const normalizedValue = calculationResults.normalizedMatrix[index][critIndex];
            const weight = crit.weight / 100;
            const contribution = normalizedValue * weight;
            totalScore += contribution;
            html += `<td>${contribution.toFixed(4)}</td>`;
        });
        html += `<td><strong>${totalScore.toFixed(4)}</strong></td></tr>`;
    });

    html += '</tbody></table>';
    container.innerHTML = html;
}

// Display ranking
function displayRanking() {
    const container = document.getElementById('ranking');
    
    let html = '<table><thead><tr><th>Peringkat</th><th>Nama Karyawan</th><th>Skor Akhir</th><th>Status</th></tr></thead><tbody>';

    calculationResults.ranking.forEach((item, index) => {
        let rankClass = '';
        let status = '';
        if (item.rank === 1) {
            rankClass = 'rank-1';
            status = '🥇 Terbaik';
        } else if (item.rank === 2) {
            rankClass = 'rank-2';
            status = '🥈 Kedua';
        } else if (item.rank === 3) {
            rankClass = 'rank-3';
            status = '🥉 Ketiga';
        } else {
            status = `#${item.rank}`;
        }

        html += `
            <tr class="${rankClass}">
                <td><strong>#${item.rank}</strong></td>
                <td>${item.employee}</td>
                <td><strong>${item.score.toFixed(4)}</strong></td>
                <td>${status}</td>
            </tr>
        `;
    });

    html += '</tbody></table>';
    container.innerHTML = html;
}

// Download result
function downloadResult() {
    if (!calculationResults) return;

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'HASIL ANALISIS SPK PEMILIHAN KARYAWAN TERBAIK\n';
    csvContent += 'Metode: Simple Additive Weighting (SAW)\n';
    csvContent += `Tanggal: ${new Date().toLocaleDateString('id-ID')}\n\n`;

    // Criteria
    csvContent += 'KRITERIA SELEKSI\n';
    csvContent += 'No,Nama Kriteria,Tipe,Bobot\n';
    calculationResults.criteria.forEach((crit, index) => {
        csvContent += `${index + 1},"${crit.name}","${crit.type}",${crit.weight}\n`;
    });

    csvContent += '\n\nHASIL PERANGKINGAN\n';
    csvContent += 'Peringkat,Nama Karyawan,Skor Akhir\n';
    calculationResults.ranking.forEach(item => {
        csvContent += `${item.rank},"${item.employee}",${item.score.toFixed(4)}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SPK_Karyawan_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Reset calculator
function resetCalculator() {
    if (confirm('Apakah Anda yakin ingin mereset semua data?')) {
        employees = [];
        calculationResults = null;
        initializeDefaultCriteria();
        renderCriteriaList();
        switchTab('setup');
    }
}