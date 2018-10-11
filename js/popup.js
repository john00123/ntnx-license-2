
const popupData ={
  title :[
    'Add Protected VMs',
    'Network options',
    'Add live VMs ',
  ],

  body: [

    //0 add instance
    ` <div class='column' style='width:100%; margin-bottom: 0px; padding:0;'>
        <h3>Silver</h3>
      </div>

      <div class='col3'>
        <div class='column'>
          <label>Num of VMs</lable>
          <input type='number'>
        </div>

        <div class='column'>
          <label>VCPUs per VM</label>
          <input type='number'>
        </div>

        <div class='column'>
          <label>Memory per VM (Ghz) </label>
          <input type='number'>
        </div>
      </div>

      <hr class='separator'>

        <div class='column' style='width:100%; margin-bottom: 0px; padding:0;'>
            <h3>Gold</h3>
          </div>

          <div class='col3'>
            <div class='column'>
              <label>Num of VMs</lable>
              <input type='number'>
            </div>

            <div class='column'>
              <label>VCPUs per VM</label>
              <input type='number'>
            </div>

            <div class='column'>
              <label>Memory per VM (Ghz) </label>
              <input type='number'>
            </div>
          </div>

      <hr class='separator'>
        <div class='column' style='width:100%; margin-bottom: 0px; padding:0;'>
            <h3>Diamond</h3>
          </div>

          <div class='col3'>
            <div class='column'>
              <label>Num of VMs</lable>
              <input type='number'>
            </div>

            <div class='column'>
              <label>VCPUs per VM</label>
              <input type='number'>
            </div>

            <div class='column'>
              <label>Memory per VM (Ghz) </label>
              <input type='number'>
            </div>
          </div>
    `,

  //1 Network options

`  <div class='network-option' style='width:100%'>
    <label>Connection type</label>
    <select style="width:100%; margin:10px 0 30px 0;">
      <option>
        100 Mpbs · Direct Connect
      </option>
      <option>
        1 Gbps · Direct Connect
      </option>
      <option>
        10 Gbps · Direct Connect
      </option>
      <option value="[object Object]"> VPN</option>
    </select>
  </div>

  <div class='network-option' style='width:100%'>
    <h3><input type='checkbox' class='disable' style='margin-right: 8px'checked> Public IPs </h3>
    <label>Num of Public IPs</label>
    <input type='number' class='disable-me' style="margin:10px 0 0 0"/>
  </div>`,

  // 24/7 VM instance

  `<div class='column'
    style='width:100%; padding:0;'>

      <div class='column' style='width:100%; margin-bottom: 10px; padding:0;'>
        <label>Num of VMs</lable>
        <input type='number'>
      </div>

      <div class='col3'>

        <div class='column'>
          <label>VCPUs per VM</label>
          <input type='number'>
        </div>

        <div class='column'>
          <label>Memory per VM (Ghz) </label>
          <input type='number'>
        </div>
      </div>

      <div class='col3' style='margin:10px 0 0 0'>
        <div class='column'>
          <label>HHD per VM(TiB)</label>
          <input type='number' margin-bottom: 0px !important;'>
        </div>

        <div class='column'>
          <label>SDD per VM(TiB) </label>
          <input type='number' style='margin-bottom: 0px !important;'>
        </div>

      </div>

    </div>
  `,

  ],

  footer:[
    //0
    `<button class="secondary cancel" onclick='removePopup()'>Cancel</button>
     <button class="primary save" style='width:auto'> Save Changes</button>`,

    //1
    `<button class="secondary cancel" onclick='removePopup()'>Cancel</button>
     <button class="primary save" style='width:auto'>Save Changes</button>`,

    //2
    `<button class="secondary cancel" onclick='removePopup()'>Cancel</button>
     <button class="primary save" style='width:auto'>Save Changes</button>`,
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
