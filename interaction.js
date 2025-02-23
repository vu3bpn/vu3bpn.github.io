
function showSection(sectionId) {
    document.querySelectorAll('.right-pane > div').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}


function loadContent(sectionId, fileName) {    
    fetch(fileName)
        .then(response => response.text())
        .then(html => {
            document.getElementById(sectionId).innerHTML = html;
        })
        .catch(error => console.error('Error loading content:', error));
    showSection(sectionId);
}