let output = document.querySelector('#output');

output.innerHTML = `
<div class='tile'>
<div class='wall square'>

</div>
</div>
`;

let walls = output
  .querySelectorAll('.wall')

  .addEventListener('mouseover', touchWall);

function touchWall(e) {
  console.log('You touched a wall');
}
