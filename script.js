let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ];

  let currentPlayer = 'circle'; // Startspieler

  // Diese Funktion überprüft, ob das Spiel vorbei ist.
function checkGameStatus() {
    // Definiere mögliche Gewinnkombinationen
    const winCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale Gewinne
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale Gewinne
      [0, 4, 8], [2, 4, 6] // Diagonale Gewinne
    ];
  
    // Überprüfe jede mögliche Gewinnkombination
    for (const combo of winCombos) {
      const [a, b, c] = combo;
      if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
        // Ein Spieler hat gewonnen
        for (let i = 0; i < fields.length; i++) {
            document.getElementById(`content`).style.pointerEvents = 'none';
          }
        drawWinningLine(combo);
        return fields[a];
      }
    }
  
    // Überprüfe auf ein Unentschieden
    if (!fields.includes(null)) {
      return 'tie';
    }
  
    return null; // Das Spiel ist noch nicht vorbei
  }
  
  function render() {
    let content = document.getElementById('content');
    let table = '<table>';
  
    for (let i = 0; i < 3; i++) {
      table += '<tr>';
      for (let j = 0; j < 3; j++) {
        let index = i * 3 + j;
        let cellValue = fields[index];
        let cellContent = '';
  
        if (cellValue === 'cross') {
          cellContent = generateCrossSVG();
        } else if (cellValue === 'circle') {
          cellContent = generateCircleSVG();
        }
  
        // Füge die Klick-Funktion hinzu und setze das HTML-Inhaltselement
        table += '<td class="' + (fields[index] || 'empty') + '" onclick="handleCellClick(' + index + ')">' + (cellContent || '') + '</td>';
      }
      table += '</tr>';
    }
  
    table += '</table>';
    content.innerHTML = table;
  }
  
  function handleCellClick(index) {
    if (!fields[index]) {
      fields[index] = currentPlayer;
      currentPlayer = (currentPlayer === 'circle') ? 'cross' : 'circle';
      document.getElementById('content').innerHTML = '';
      render();
      const gameResult = checkGameStatus();
      console.log('And The Winner is ' + gameResult)
    }
  }
  
  // Initialisiere die Tabelle
  render();
  

  function generateCircleSVG() {
    const svgCode = `
      <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
        <circle cx="25" cy="25" r="20" fill="none" stroke="blue" stroke-width="10">
          <animate attributeName="r" from="0" to="20" dur="125ms" begin="0s" repeatCount="1" />
        </circle>
      </svg>
    `;
    return svgCode;
  }

  function generateCrossSVG() {
    // Breite und Höhe der Grafik
    const width = 50;
    const height = 50;
    
    // SVG-Code für das gelbe "X" mit Animation
    const svgCode = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <line x1="0" y1="0" x2="${width}" y2="${height}" stroke="yellow" stroke-width="10">
          <animate attributeName="x2" from="0" to="${width}" dur="125ms" begin="0s" fill="freeze" />
        </line>
        <line x1="0" y1="${height}" x2="${width}" y2="0" stroke="yellow" stroke-width="10">
          <animate attributeName="x2" from="0" to="${width}" dur="125ms" begin="0s" fill="freeze" />
        </line>
      </svg>
    `;
    
    return svgCode;
  }

 
    function drawWinningLine(combo) {
        const [a, b, c] = combo;
        const table = document.querySelector('table');
        const cells = table.getElementsByTagName('td');
        const cellA = cells[a];
        const cellB = cells[b];
        const cellC = cells[c];
      
        const line = document.createElement('div');
        line.classList.add('winning-line');
        
        // Berechne die Position der Linie basierend auf den Zellen
        const x1 = cellA.offsetLeft + cellA.offsetWidth / 2;
        const y1 = cellA.offsetTop + cellA.offsetHeight / 2;
        const x2 = cellC.offsetLeft + cellC.offsetWidth / 2;
        const y2 = cellC.offsetTop + cellC.offsetHeight / 2;
      
        // Berechne die Länge und Rotation der Linie
        const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const angle = Math.atan2(y2 - y1, x2 - x1);
      
        // Setze die Position, Länge und Rotation der Linie mit CSS
        line.style.position = 'absolute';
        line.style.left = x1 + 'px';
        line.style.top = y1 + 'px';
        line.style.width = length + 'px';
        line.style.transform = `rotate(${angle}rad)`;
        line.style.transformOrigin = `top left`;
      
        // Füge die Linie direkt zum 'table'-Element hinzu
        table.appendChild(line);
      }
      
function restartGame() {
    fields = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ];
      for (let i = 0; i < fields.length; i++) {
        document.getElementById(`content`).style.pointerEvents = 'auto';
    }
      render();
}