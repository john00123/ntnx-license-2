let name = [
  {
    name: 'Acropolis',
    status: 'Product License',
    description: `Acropolis is licensed based on the capacity of the cluster measured in terms of total number of cores and TiB flash storage.`,
    type: 'capacity',
    storageCost: 0,
    coreCost: 0,
    storageTotal: 500,
    coreTotal: 500
  },
  {
    name: 'Files',
    status: 'Product License',
    description: `Files is licensed based on the storage capacity measured in terms of total TiB storage being used by the files service.`,
    type: 'capacity',
    storageCost: 200,
    coreCost: 200,
    storageTotal: 500,
    coreTotal: 500
  },
  {
    name: 'Data Encryption',
    status: 'Product Add-on',
    description: `Nutanix Data Encryption add-on is licensed based on the same capacity as the product licenses they are being applied on.`,
    type: 'capacity',
    storageCost: 0,
    coreCost: 0,
    storageTotal: 500,
    coreTotal: 500
  }
]

const firstPage = `
  <div class='image-container'>
    <img src='../img/license.svg'/>
    <h3> Upload Summary File </h3> </br>
    <p> This is the file you downloaded from Prism Central or Prism Element. This file has information needed to license your cluster on various Nutanix products.</p>
    </br>
    <div>



      <div class='upload-file'>
        <label class='file-button' for='file'>Select File</label>
        <input type="file" id='file' style:'display:none'>  <button class='primary start btn-disabled' style='margin-right:10px'> Upload File</button>
      </div>


    </div>
  </div>
`

const acropolisPopover =`
  <div class='popover'>
    <h3 class='fw'> Select License Level </h3>
    <div class='selectdiv'>
      <label> License Level</label>
      <select id='license-tier'>
        <option value='0' disabled selected>Select your option</option>
        <option value='1'> Starter</option>
        <option value='2'> Pro </option>
        <option value='3'> Ultimate </option>
      </select>
    </div>

    <button class='primary pop-save fw'> Save </button>
  </div>
`

const necropolisPopover =`
  <div class='popover'>

    <h3 class='fw'> Select TiB </h3>
    <div class='selectdiv'>
      <label> License Level 🔒 &nbsp;&nbsp;<span class='locked'>Why?</span> </label>
      <select id='license-tier' disabled>
        <option value='0' disabled selected>Select your option</option>
        <option value='1'> Starter (100 available)</option>
        <option value='2' selected> Pro (500 available) </option>
        <option value='3' disabled> Ultimate (0 available) </option>
      </select>
    </div>
      <label >TiB of Licensed storage</label>
      <input style='margin-top:10px' id='files-tib' type='number'/>

    <button class='primary pop-save fw files'> Save </button>
  </div>
`

const trecropolisPopover =`
  <div class='popover'>
    <h3 class='fw'> Select Products</h3>
      <p> <input type='checkbox' checked> Acropolis</p>
      <p> <input type='checkbox' checked> File-server</p>
    <button class='primary pop-save fw files'> Save </button>
  </div>
`

function box(name, storageCost, storageTotal, coreCost, coreTotal){
  switch(name){
    case 'Data Encryption':
    return(`
      <div class='cost-box cost-gray'>
        <p class='c-cost'></p>
        <p class='s-cost'></p>
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
        <p class='c-cost'> Requires ${coreTotal}</p>
        <p class='s-cost'> Requires ${storageTotal}</p>
      </div>`);
    break;
    default:
    console.log('Sorry, we are out of Mangoes');
  }
}

function cardStructure(
  name, status, description,
  storageCost, storageTotal, coreCost, coreTotal){
  const names = name.replace(/\s+/g, '');
  return (
    ` <div class='deck'>
        <div class='card c${names}'>
          <h1 class='title'  > ${name}   </h1></br>
          <h3 data-type='alt'> ${status} </h3></br>
          <p class='description'> ${description}</p>
          ${box(name, storageCost, storageTotal, coreCost, coreTotal)}

          <button id='${names}' class='secondary footer-btn'>
            ${ (status == 'Unlicensed')
            ? `Select License`
            : (status == 'Licensed')
            ? `Modify Licenses`
            : `Select License`}
          </button></div>
      </div>
  `)
}

//first page
$('container').html(firstPage)
$('footer').toggle()
uploadFile()
//upload input component

function uploadFile() {
  $("input[type='file']").change(uploadPath);
}

function uploadPath() {
  let path = $(this).val().replace("C:\\fakepath\\", '');
  $('.path').val(path);
  $('button').removeClass('btn-disabled');
}


//back to first firstPage
function reset(){
  $('container').html(firstPage)
  $('footer').toggle()
  uploadFile()
}

//clicks on upload file
function licensePage(){

  $('footer').toggle()
  $('container').html(name.map(name => cardStructure(name.name, name.status, name.description, name.storageCost, name.storageTotal, name.coreCost, name.coreTotal)))

  //add-on ⭐️
  $('.cDataEncryption h1').addClass('addon-title')
  $('.cDataEncryption').css('opacity','0.3')
  $('.cDataEncryption').css('pointer-events','none')

  //click on license action button
  $('.footer-btn').click(function(){
    const popover = $('.popover')
    const parent = $(this).parent()
    const element = $(this)

    //remove ability to trigger event again
    element.addClass('disabled')

    //checks on type of button pressed for acropolis
    if (element.is('#Acropolis')){
      parent.append(acropolisPopover)
      licenseTier()
    }

    //checks on type of button pressed for acropolis
    if (element.is('#Files')){
      parent.append(necropolisPopover)
    }

    //checks on type of button pressed for acropolis
    if (element.is('#DataEncryption')){
      parent.append(trecropolisPopover)
      checks();
    }

    //element intelligent positioning ((needs heavy refinement))
    (element.offset().left > 300) ?
      $('.popover').addClass('popover-right') :
      null

    //on save event
    $('.pop-save').click(()=> {
      const popover = $('.popover')
      const parent = $(this).parent()
      const button = $('.footer-btn')
      const place = parent.find('.footer-btn')
      $('.next').removeClass('btn-disabled');
      button.removeClass('disabled')
      popover.remove()
      parent.find('.cost-box').addClass('cost-blue')
      $('.cDataEncryption').addClass('active')
      $('.cDataEncryption').css('pointer-events','')


      if(place.is('#Acropolis')){
        const thirdCard = parent.parent().next().next()
        parent.find('.c-cost').text(`500`)
        parent.find('.s-cost').text(`500`)
        parent.find('h1').append('Pro')
        parent.find('h3').append('exp. Dec 12 2020')
        thirdCard.find('.c-cost').text(`Acropolis 500`)
        thirdCard.find('.s-cost').text(`Acropolis 500`)
      }

      if(place.is('#Files')){
        parent.find('.s-cost').html('500')
        parent.find('h1').append('Pro')
        parent.find('h3').append('exp. Dec 12 2020')
        parent.parent().next().find('.s-cost').after(`
          <p class='s-cost'>Files requires 500</p>`)
      }

      if(place.is('#DataEncryption')){
        parent.find('.c-cost').text('500');
        parent.find('.s-cost:eq(0)').text('500');
        parent.find('.s-cost:eq(1)').text('500');
      }
    });
  });


}

//checbox dependency select
function checks(){
  $(':checkbox').click(function(event){
    if(this.checked){
      $(':checkbox').each(function(){this.checked = true})}
    else {
      $(':checkbox').each(function(){this.checked = false})}
  })
}

//acropolis first time license tier function
function licenseTier(){

  $('.pop-save').addClass('btn-disabled');
  $('#license-tier').change(function(){
    const value = $(this).val();

    if(value == 3){
      $('#core-input').addClass('input-error');
      $('.input-grid').append(`<span class='red iii'> Not enought licenses. Select different tier.</span>`);
      $('.pop-save').addClass('btn-disabled')
    }
    else{
      $('#core-input').removeClass('input-error');
      $('.iii').remove();
      $('.pop-save').removeClass('btn-disabled');
    }
  })
}


function tablePage(){
  $('container').html(reviewPage);
  $('.furniture-store').append(acropolisTable);
  $('.furniture-store').append(filesTable);
  $('.furniture-store').append(dataEncryptionTable);
}

// change steps

let item = 1;

  $('.start, .next').click(function() {
    $(`.pos${item + 1} span`).addClass('active-step');
    $(`.pos${item} span`).removeClass('active-step');
    if(item < 4){item += 1};
    if(item == 2){
      licensePage()
      $('.next').addClass('btn-disabled');
    }

    if(item == 3){
      tablePage()
      $('.next').text('Download License')
    }

    if(item == 4){
      CreatePopup(0,0,0)
    }

  });

  $('.back').click(function() {
    $(`.pos${item - 1} span`).addClass('active-step');
    $(`.pos${item} span`).removeClass('active-step');
    item -= 1;

    //weird reloading action nesting....

    if(item == 1){
      reset()
      $('.start').off('click');
      $('.start').on('click', function(){
        $(`.pos${item + 1} span`).addClass('active-step');
        $(`.pos${item} span`).removeClass('active-step');
        licensePage()
        item +=1;
      });
    }
    if(item == 2){
      licensePage();
      $('footer').toggle();
    }


  });


//close popover

$(document).mouseup(function (e) {
  const popover = $('.popover');
  const button = $('.footer-btn');
  if(!popover.is(e.target) && popover.has(e.target).length === 0){
      popover.remove()
    if(button.hasClass('disabled')){
       button.removeClass('disabled');
    }
  }
});



// $('.start').click();
// $('.next').click();
