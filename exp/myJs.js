//���ڴ洢������Ϣ
  var album = [{
    "name": "Introduction", "imageURL": "../imgs/01.jpg", "description": "Going Seventeen"
  }, {
    "name": "Posters", "imageURL": "../imgs/02.jpg", "description": "FACE THE SUN"
  }, {
    "name": "The Ledge", "imageURL": "../imgs/03.jpg", "description": "HENG:GARAE"
  }, {
    "name": "Eat Local", "imageURL": "../imgs/04.jpg", "description": "SECOND WIND"
  }]


// ����һ����ΪUI�Ķ������ڴ洢ϵͳ�Ŀ�Ⱥ͸߶���Ϣ
var UI = {};
// ��¼ϵͳ���ڵĿ�Ⱥ͸߶ȣ������ƿ�Ȳ����� 600px
UI.deviceWidth = window.innerWidth > 600 ? 600 : window.innerWidth;
UI.deviceHeight = window.innerHeight;
// ����Ĭ�������С
const Letters = 33; // ��ĸ����
const baseFont = UI.deviceWidth / Letters; // ��׼�����С
// ����ҳ��������СΪĬ�������С
document.body.style.fontSize = baseFont + 'px';
// ͨ����̬CSS����ҳ��ȫ����ʾ
document.body.style.width = UI.deviceWidth + 'px';
document.body.style.height = UI.deviceHeight + 'px';
if (window.innerWidth < 1000) {
    $("#aid").style.display = 'none';
}
$("#aid").style.width = window.innerWidth - UI.deviceWidth - baseFont * 3 + 'px';
$("#aid").style.height = UI.deviceHeight + 'px';


/*ʵ������Enter�����л��У�BackSpace����ɾ��*/
$("body").addEventListener("keydown", function (ev) {
    let k = ev.key;
    let c = ev.keyCode;
    $("status").textContent = "���Ѱ��¼� ��" + k + " ��" + "�ַ����� ��" + c;
});
$("body").addEventListener("keyup", function (ev) {
    let k = ev.key;
    let c = ev.keyCode;
    $("status").textContent = "�ɿ����� ��" + k + " ��" + "�ַ����� ��" + c;
    /*�жϼ��̰��µ��Ƿ�ΪEnter�����������pԪ��ʵ�ֻ���*/
    if (k === "Enter") {
        //����ֻ����document�д����ӽڵ�
        let p = document.createElement("p");
        //ͨ������pԪ�أ�����ӽڵ���ʵ�ֻ��С�
        $("keyboard").appendChild(p);
    } else if (k === "Backspace") {
        /*û���ַ�����ɾ���ˣ��򽫸��ӽڵ�ɾ��*/
        if ($("keyboard").lastElementChild.textContent === "") {
            /*ɾ��ǰ��֤keyboard��������һ���ֽڵ�*/
            if ($("keyboard").childElementCount > 1) {
                $("keyboard").removeChild($("keyboard").lastElementChild);
            }
        } else {
            $("keyboard").lastElementChild.textContent = $("keyboard").lastElementChild.textContent.slice(0, -1);
        }
    } else if (printLetter(k)) {
        $("keyboard").lastElementChild.textContent += k;
    }

    /*�ж��Ƿ��ǵ����ַ�*/
    function printLetter(k) {
        //�ж��ַ��������Ƿ����1
        if (k.length > 1) {
            return false;
        }
        let puncs = ['~', '`', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', ',', '.', '<', '>', '?', '/', "'", ' '];
        /*��ĸ���*/
        if ((k >= 'a' && k <= 'z') || (k >= 'A' && k <= 'Z') || (k >= '0' && k <= '9')) {
            return true;
        }
        /*�������*/
        for (let p of puncs) {
            if (p === k) {
                return true;
            }
        }
        return false;
        //������߽׵����⣬��δ��������ո���Ʊ��tab��
    }
});


/*ʵ�ַ�ҳ����*/
var currentIndex = 0;
var posterContainer = $("album-container");

function showPoster(index) {
    var currentPoster = album[index];
    var posterHTML = `
            <div class="album" style="width: 100%;height: 100%">
                <img src="${currentPoster.imageURL}" alt="${currentPoster.name}">
            </div>
        `;
    posterContainer.innerHTML = posterHTML;
    $("title").textContent = currentPoster.name;
    $("introduce").textContent = currentPoster.description;
}

// ��ʼ����ʾ��һ�ź���
showPoster(currentIndex);
// ������껬���¼�
document.addEventListener('wheel', function (event) {
    // ������ϻ�������ʾǰһ�ź���
    if (event.deltaY < 0) {
        currentIndex = (currentIndex === 0) ? album.length - 1 : currentIndex - 1;
    }
    // ������»�������ʾ��һ�ź���
    else {
        currentIndex = (currentIndex === album.length - 1) ? 0 : currentIndex + 1;
    }
    showPoster(currentIndex);
});

function $(ele) {
    if (typeof ele !== 'string') {
        throw("�Զ����$�����������������ʹ���ʵ�α������ַ�����");
        return
    }
    let dom = document.getElementById(ele);
    if (dom) {
        return dom;
    } else {
        dom = document.querySelector(ele);
        if (dom) {
            return dom;
        } else {
            throw("ִ��$����δ����ҳ���ϻ�ȡ�κ�Ԫ�أ����Բ����⣡");
            return;
        }
    }
}