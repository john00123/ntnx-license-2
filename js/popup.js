
const popupData ={
  title :[
    'Almost Done'
  ],

  body: [
    //0 add instance
    `
        <img src='../img/license.svg' style='height:100px'/><br>
        <p>Upload the downloaded license summary file onto Prism Element of this cluster to complete the process. </p>

    `
  ],

  footer:[
    //0
    `<button class="secondary save" onclick="removePopup()"" style='width:auto'>Close</button>
    <button class="primary save" onclick="removePopup()" style='width:auto; margin-left:10px'><a href='../img/license-file.xml' download>Download Again</a></button>
    `,
  ]
}

function removePopup(){
  $('.overlay').remove();
  $('body').css('overflow','initial');
}

function CreatePopup(i,j,k){
 $('body').css('overflow','hidden');
 $('body').append(`<div class="overlay">
    <div class="popup">
      <div class="popup-header" onclick='removePopup()'>${popupData.title[i]}</div>
      <div class="popup-body">${popupData.body[j]}</div>
      <div class="popup-footer">${popupData.footer[k]}</div>
    </div>
  </div>
  `);
}
