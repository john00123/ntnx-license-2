
let name = [
  {
    name: 'Acropolis',
    status: 'Unlicensed',
    description: `Nutanix Acropolis combines compute, storage, networking, virtualization, and much needed data protection and security capabilities into a hyperconverged solution that powers your enterprise cloud.`,
    type: 'capacity',
    storageCost: 0,
    coreCost: 0,
    storageTotal: 500,
    coreTotal: 500
  },
  {
    name: 'Files',
    status: 'Unlicensed',
    description: `Nutanix Files is a software-defined scale-out file storage solution for unstructured file data.  It provides a highly available and massively scalable data repository for a wide range of  deployments and applications.`,
    type: 'capacity',
    storageCost: 200,
    coreCost: 200,
    storageTotal: 500,
    coreTotal: 500
  },
  {
    name: 'Software Encryption',
    status: 'Unlicensed',
    description: `Nutanix's License Add-on "Software encryption" protects your data with data-at-rest encryption.`,
    type: 'capacity',
    storageCost: 0,
    coreCost: 0,
    storageTotal: 500,
    coreTotal: 500
  }
]


const firstPage =`
  <div class='image-container'>
    <img src='../img/license.svg'/>
    <h3> Summary File </h3> </br>
    <p> This data has information needed to license you Prism Central or Cluster</p>
    </br>
    <div>
      <button class='primary start' style='margin-right:10px'> Upload File</button>
      <button class='secondary-alt'> Dark Sites </button>
    </div>
  </div>`

const acropolisPopover =`
  <div class='popover'>
    <h3 class='fw'> Select License </h3>
    <div class='selectdiv'>
      <label> License Tier</label>
      <select>
        <option value="" disabled selected>Select your option</option>
        <option> Starter</option>
        <option> Pro </option>
        <option> Ultimate </option>
      </select>
    </div>
    <div class='input-grid'>
      <fieldset>
        <label for = 'core-input'> Core</label>
        <input id='core-input' type='number'></input>
      </fieldset>
      <fieldset>
        <label for = 'core-input'> Storage</label>
        <input id='core-input' type='number'></input>
      </fieldset>
    </div>
    <button class='primary fw pop-save'> Save </div>
  </div>
`



function box(name, storageCost, storageTotal, coreCost, coreTotal){
  switch(name){
    case 'Software Encryption':
    return(`
      <div class='cost-box cost-gray'>
        <p class='s-cost'> ${storageCost} of ${storageTotal}</p>
      </div>`);
    break;
    case 'Files':
    return(`
      <div class='cost-box cost-gray'>
        <p class='s-cost'> Requires </p>
      </div>`);
    break;
    case 'Acropolis':
    return(`
      <div class='cost-box cost-gray'>
        <p class='c-cost'> ${coreCost} of ${coreTotal}</p>
        <p class='s-cost'> ${storageCost} of ${storageTotal}</p>
      </div>`);
    break;
    default:
    console.log('Sorry, we are out of Mangoes');
  }
}


function cardStructure(name, status, description, storageCost, storageTotal, coreCost, coreTotal) {
  return (

    ` <div class='deck'>
        <div class='card'>
          <h1 class='title'  > ${name}   </h1></br>
          <h3 data-type='alt'> ${status} </h3></br>
          <p> ${description}</p>
          ${box(name, storageCost, storageTotal, coreCost, coreTotal)}

          <button id='${name}' class='secondary footer-btn'>
            ${ (status == 'Unlicensed')
            ? `Select License`
            : (status == 'Licensed')
            ? `Modify Licenses`
            : `Add more Licenses`}
          </button></div>

      </div>
  `)
}


//first page

$('container').append(firstPage);

$('.start').click(function() {
  $('container').html(name.map(name => cardStructure(name.name, name.status, name.description, name.storageCost, name.storageTotal, name.coreCost, name.coreTotal)));

  $('.footer-btn').click(function(){
  $(this).parent().append(acropolisPopover);
  ($(this).offset().left > 300) ?$('.popover').addClass('popover-right') : null;
  $('.pop-save').click(()=> {
    alert('Changes saved')
    $('.popover').remove();
    $(this).parent().find('.cost-box').addClass('cost-blue');
    $(this).parent().find('.c-cost').html('500 of 500');
    $(this).parent().find('.s-cost').html('500 of 500');
  });
  });
});


$(document).mouseup(function (e) {
  const popover = $(".popover");
  if (!popover.is(e.target) && popover.has(e.target).length === 0)
  { popover.remove(); }
});



$('.start').click();
