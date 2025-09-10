// ฟังก์ชันสร้างสีแบบสุ่มในรูปแบบ HEX
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// จับปุ่มแล้วเปลี่ยนสี background ของ body
document.getElementById('changeColorBtn').addEventListener('click', function () {
    const randomColor = getRandomColor();
    document.body.style.backgroundColor = randomColor;
});
