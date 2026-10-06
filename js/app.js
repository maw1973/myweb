// ======================================
// 商品資料
// ======================================

let products = [

    {
        id: 1,
        name: "草莓鮮奶油蛋糕",
        category: "cake",
        categoryName: "蛋糕",
        icon: "🍓🎂",
        bgClass: "pink-bg",
        description: "新鮮草莓搭配北海道鮮奶油，清爽細緻。",
        status: "供應中",
        availableDays: 14,
        dailyLimit: 12,

        sizes: [
            {
                name: "6吋",
                price: 680
            },
            {
                name: "8吋",
                price: 880
            },
            {
                name: "10吋",
                price: 1180
            }
        ]
    },


    {
        id: 2,
        name: "法式巧克力蛋糕",
        category: "cake",
        categoryName: "蛋糕",
        icon: "🍫🎂",
        bgClass: "brown-bg",
        description: "濃郁黑巧克力與可可香氣，口感濕潤。",
        status: "供應中",
        availableDays: 14,
        dailyLimit: 10,

        sizes: [
            {
                name: "6吋",
                price: 720
            },
            {
                name: "8吋",
                price: 920
            }
        ]
    },


    {
        id: 3,
        name: "巴斯克乳酪蛋糕",
        category: "cake",
        categoryName: "蛋糕",
        icon: "🧀🍰",
        bgClass: "yellow-bg",
        description: "濃郁乳酪與焦香表層，口感滑順。",
        status: "暫停供應",
        availableDays: 7,
        dailyLimit: 8,

        sizes: [
            {
                name: "6吋",
                price: 650
            },
            {
                name: "8吋",
                price: 850
            }
        ]
    },


    {
        id: 4,
        name: "焦糖雞蛋布丁",
        category: "dessert",
        categoryName: "小甜點",
        icon: "🍮",
        bgClass: "cream-bg",
        description: "滑嫩布丁搭配微苦焦糖。",
        status: "供應中",
        availableDays: 10,
        dailyLimit: 30,

        sizes: [
            {
                name: "單入",
                price: 90
            },
            {
                name: "6入",
                price: 520
            }
        ]
    },


    {
        id: 5,
        name: "法式馬卡龍",
        category: "dessert",
        categoryName: "小甜點",
        icon: "🌈🍪",
        bgClass: "purple-bg",
        description: "六種人氣口味綜合馬卡龍。",
        status: "供應中",
        availableDays: 14,
        dailyLimit: 20,

        sizes: [
            {
                name: "6入",
                price: 360
            },
            {
                name: "12入",
                price: 680
            }
        ]
    },


    {
        id: 6,
        name: "奶油手工餅乾",
        category: "dessert",
        categoryName: "小甜點",
        icon: "🍪",
        bgClass: "coffee-bg",
        description: "天然奶油手工製作，香酥不膩。",
        status: "售完",
        availableDays: 7,
        dailyLimit: 15,

        sizes: [
            {
                name: "小盒",
                price: 180
            },
            {
                name: "大盒",
                price: 320
            }
        ]
    },


    {
        id: 7,
        name: "午後甜點禮盒",
        category: "gift",
        categoryName: "禮盒",
        icon: "🎁",
        bgClass: "blue-bg",
        description: "餅乾、可麗露與馬卡龍人氣組合。",
        status: "供應中",
        availableDays: 21,
        dailyLimit: 10,

        sizes: [
            {
                name: "標準盒",
                price: 580
            }
        ]
    },


    {
        id: 8,
        name: "幸福綜合禮盒",
        category: "gift",
        categoryName: "禮盒",
        icon: "🎀🧁",
        bgClass: "rose-bg",
        description: "精選六款人氣甜點，適合送禮。",
        status: "供應中",
        availableDays: 21,
        dailyLimit: 8,

        sizes: [
            {
                name: "標準盒",
                price: 880
            }
        ]
    }

];


// ======================================
// 訂單資料
// ======================================

let orders = [];

let currentAdminFilter = "全部";


// ======================================
// 初始化
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadProducts();

        loadOrders();

        renderProducts();

        createProductOptions();

        setMinimumPickupDate();

        setupCategoryFilter();

        setupOrderEvents();

        renderAdminOrders();

        renderProductManagement();

    }
);


// ======================================
// 商品列表
// ======================================

function renderProducts() {

    const container =
        document.getElementById(
            "productList"
        );


    let html = "";


    products.forEach(
        function (product) {

            const minimumPrice =
                Math.min(
                    ...product.sizes.map(
                        function (size) {

                            return size.price;

                        }
                    )
                );


            const disabled =
                product.status !== "供應中"
                    ? "disabled"
                    : "";


            html += `

                <div class="col-md-6 col-lg-3 product-item"
                     data-category="${product.category}">

                    <div class="product-card">

                        <div class="product-image ${product.bgClass}">

                            ${product.icon}

                        </div>


                        <div class="product-content">

                            <small>
                                ${product.categoryName}
                            </small>


                            <h4>
                                ${escapeHtml(product.name)}
                            </h4>


                            <p>
                                ${escapeHtml(product.description)}
                            </p>


                            ${getStatusBadge(product.status)}


                            <div class="product-price mt-3">

                                NT$ ${formatPrice(minimumPrice)} 起

                            </div>


                            <div class="product-actions">

                                <button class="btn btn-detail"
                                        onclick="showProductDetail(${product.id})">

                                    詳細資料

                                </button>


                                <button class="btn btn-order"
                                        ${disabled}
                                        onclick="selectProduct(${product.id})">

                                    ${
                                        product.status === "供應中"
                                            ? "我要預訂"
                                            : product.status
                                    }

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            `;

        }
    );


    container.innerHTML =
        html;

}


// ======================================
// 商品狀態 Badge
// ======================================

function getStatusBadge(
    status
) {

    if (
        status === "供應中"
    ) {

        return `

            <span class="status status-available">
                供應中
            </span>

        `;

    }


    if (
        status === "暫停供應"
    ) {

        return `

            <span class="status status-pause">
                暫停供應
            </span>

        `;

    }


    return `

        <span class="status status-soldout">
            售完
        </span>

    `;

}


// ======================================
// 商品詳細 Modal
// ======================================

function showProductDetail(
    id
) {

    const product =
        products.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!product) {
        return;
    }


    document.getElementById(
        "modalProductName"
    ).textContent =
        product.name;


    document.getElementById(
        "modalProductImage"
    ).innerHTML =
        product.icon;


    document.getElementById(
        "modalDescription"
    ).textContent =
        product.description;


    document.getElementById(
        "modalStatus"
    ).innerHTML =
        getStatusBadge(
            product.status
        );


    document.getElementById(
        "modalAvailableDays"
    ).textContent =
        "未來 " +
        product.availableDays +
        " 天";


    let sizeHtml = "";


    product.sizes.forEach(
        function (size) {

            sizeHtml += `

                <div class="size-price-row">

                    <span>
                        ${escapeHtml(size.name)}
                    </span>

                    <strong>
                        NT$ ${formatPrice(size.price)}
                    </strong>

                </div>

            `;

        }
    );


    document.getElementById(
        "modalSizeList"
    ).innerHTML =
        sizeHtml;


    const button =
        document.getElementById(
            "modalOrderButton"
        );


    button.disabled =
        product.status !==
        "供應中";


    button.textContent =
        product.status ===
        "供應中"
            ? "我要預訂"
            : product.status;


    button.onclick =
        function () {

            const modalElement =
                document.getElementById(
                    "productModal"
                );


            const modal =
                bootstrap.Modal.getInstance(
                    modalElement
                );


            if (modal) {

                modal.hide();

            }


            selectProduct(
                product.id
            );

        };


    const modal =
        new bootstrap.Modal(
            document.getElementById(
                "productModal"
            )
        );


    modal.show();

}


// ======================================
// 商品下拉
// ======================================

function createProductOptions() {

    const select =
        document.getElementById(
            "productSelect"
        );


    select.innerHTML = `

        <option value="">
            請選擇商品
        </option>

    `;


    products
        .filter(
            function (product) {

                return (
                    product.status ===
                    "供應中"
                );

            }
        )
        .forEach(
            function (product) {

                const option =
                    document.createElement(
                        "option"
                    );


                option.value =
                    product.id;


                option.textContent =
                    product.name;


                select.appendChild(
                    option
                );

            }
        );

}


// ======================================
// 商品卡直接預訂
// ======================================

function selectProduct(
    id
) {

    const product =
        products.find(
            function (item) {

                return (
                    item.id === id
                );

            }
        );


    if (
        !product ||
        product.status !== "供應中"
    ) {

        alert(
            "目前無法預訂此商品。"
        );

        return;

    }


    document.getElementById(
        "productSelect"
    ).value =
        id;


    updateSizeOptions();

    updateEstimatedTotal();


    document.getElementById(
        "order"
    ).scrollIntoView({
        behavior: "smooth"
    });

}


// ======================================
// 尺寸選項
// ======================================

function updateSizeOptions() {

    const productId =
        Number(
            document.getElementById(
                "productSelect"
            ).value
        );


    const sizeSelect =
        document.getElementById(
            "sizeSelect"
        );


    sizeSelect.innerHTML =
        "";


    const product =
        products.find(
            function (item) {

                return (
                    item.id ===
                    productId
                );

            }
        );


    if (!product) {

        sizeSelect.innerHTML = `

            <option value="">
                請先選商品
            </option>

        `;


        document.getElementById(
            "pickupDate"
        ).removeAttribute(
            "max"
        );


        updateEstimatedTotal();

        return;

    }


    product.sizes.forEach(
        function (size) {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                size.name;


            option.textContent =
                size.name +
                " - NT$ " +
                formatPrice(
                    size.price
                );


            sizeSelect.appendChild(
                option
            );

        }
    );


    updatePickupDateLimit(
        product.availableDays
    );


    updateEstimatedTotal();

}


// ======================================
// 日期規則
// 至少提前兩天
// 週一不可取貨
// ======================================

function setMinimumPickupDate() {

    const pickupDate =
        document.getElementById(
            "pickupDate"
        );


    const earliest =
        getEarliestPickupDate();


    pickupDate.min =
        formatDateInput(
            earliest
        );


    document.getElementById(
        "pickupDateHint"
    ).textContent =
        "最早可取貨：" +
        formatDisplayDate(
            earliest
        ) +
        "；每週一公休不可取貨。";

}


// ======================================
// 最早取貨日
// 今天 + 2 天
// 若為週一則順延
// ======================================

function getEarliestPickupDate() {

    const date =
        new Date();


    date.setHours(
        0,
        0,
        0,
        0
    );


    date.setDate(
        date.getDate() + 2
    );


    if (
        date.getDay() === 1
    ) {

        date.setDate(
            date.getDate() + 1
        );

    }


    return date;

}


// ======================================
// 商品最大可預訂日期
// ======================================

function updatePickupDateLimit(
    availableDays
) {

    const maxDate =
        new Date();


    maxDate.setHours(
        0,
        0,
        0,
        0
    );


    maxDate.setDate(
        maxDate.getDate() +
        Number(availableDays)
    );


    document.getElementById(
        "pickupDate"
    ).max =
        formatDateInput(
            maxDate
        );

}


// ======================================
// 日期驗證
// ======================================

function validatePickupDate(
    showMessage = true
) {

    const input =
        document.getElementById(
            "pickupDate"
        );


    if (!input.value) {

        if (showMessage) {

            alert(
                "請選擇取貨日期。"
            );

        }


        return false;

    }


    const selectedDate =
        parseLocalDate(
            input.value
        );


    selectedDate.setHours(
        0,
        0,
        0,
        0
    );


    const earliest =
        getEarliestPickupDate();


    if (
        selectedDate <
        earliest
    ) {

        if (showMessage) {

            alert(
                "需至少提前兩天預訂。\n\n" +
                "最早可選：" +
                formatDisplayDate(
                    earliest
                )
            );

        }


        input.value =
            "";


        return false;

    }


    // 星期一 = 1
    if (
        selectedDate.getDay() === 1
    ) {

        if (showMessage) {

            alert(
                "每週一為公休日，無法選擇週一取貨。\n請選擇其他日期。"
            );

        }


        input.value =
            "";


        return false;

    }


    const productId =
        Number(
            document.getElementById(
                "productSelect"
            ).value
        );


    const product =
        products.find(
            function (item) {

                return (
                    item.id ===
                    productId
                );

            }
        );


    if (product) {

        const maxDate =
            new Date();


        maxDate.setHours(
            0,
            0,
            0,
            0
        );


        maxDate.setDate(
            maxDate.getDate() +
            product.availableDays
        );


        if (
            selectedDate >
            maxDate
        ) {

            if (showMessage) {

                alert(
                    "此商品目前只開放未來 " +
                    product.availableDays +
                    " 天內預訂。"
                );

            }


            input.value =
                "";


            return false;

        }

    }


    return true;

}


// ======================================
// 金額計算
// ======================================

function updateEstimatedTotal() {

    const productId =
        Number(
            document.getElementById(
                "productSelect"
            ).value
        );


    const sizeName =
        document.getElementById(
            "sizeSelect"
        ).value;


    const quantity =
        Number(
            document.getElementById(
                "quantity"
            ).value
        ) || 1;


    const product =
        products.find(
            function (item) {

                return (
                    item.id ===
                    productId
                );

            }
        );


    if (!product) {

        document.getElementById(
            "estimatedTotal"
        ).textContent =
            "NT$ 0";


        return;

    }


    const size =
        product.sizes.find(
            function (item) {

                return (
                    item.name ===
                    sizeName
                );

            }
        );


    if (!size) {

        document.getElementById(
            "estimatedTotal"
        ).textContent =
            "NT$ 0";


        return;

    }


    const total =
        size.price *
        quantity;


    document.getElementById(
        "estimatedTotal"
    ).textContent =
        "NT$ " +
        formatPrice(
            total
        );

}


// ======================================
// 表單事件
// ======================================

function setupOrderEvents() {

    document.getElementById(
        "productSelect"
    ).addEventListener(
        "change",
        updateSizeOptions
    );


    document.getElementById(
        "sizeSelect"
    ).addEventListener(
        "change",
        updateEstimatedTotal
    );


    document.getElementById(
        "quantity"
    ).addEventListener(
        "input",
        updateEstimatedTotal
    );


    document.getElementById(
        "pickupDate"
    ).addEventListener(
        "change",
        function () {

            validatePickupDate(
                true
            );

        }
    );


    document.getElementById(
        "orderForm"
    ).addEventListener(
        "submit",
        submitOrder
    );

}


// ======================================
// 送出訂單
// ======================================

function submitOrder(
    event
) {

    event.preventDefault();


    const name =
        document.getElementById(
            "customerName"
        ).value.trim();


    const phone =
        document.getElementById(
            "customerPhone"
        ).value.trim();


    const productId =
        Number(
            document.getElementById(
                "productSelect"
            ).value
        );


    const sizeName =
        document.getElementById(
            "sizeSelect"
        ).value;


    const quantity =
        Number(
            document.getElementById(
                "quantity"
            ).value
        );


    const pickupDate =
        document.getElementById(
            "pickupDate"
        ).value;


    const pickupTime =
        document.getElementById(
            "pickupTime"
        ).value;


    const candle =
        document.getElementById(
            "candle"
        ).value;


    const tableware =
        document.getElementById(
            "tableware"
        ).value;


    const cakeMessage =
        document.getElementById(
            "cakeMessage"
        ).value.trim();


    const note =
        document.getElementById(
            "note"
        ).value.trim();


    // 姓名
    if (
        name === ""
    ) {

        alert(
            "請輸入姓名。"
        );

        return;

    }


    // 台灣手機
    const phoneRule =
        /^09\d{8}$/;


    if (
        !phoneRule.test(
            phone
        )
    ) {

        alert(
            "手機號碼格式錯誤。\n請輸入 09 開頭的 10 碼手機號碼。"
        );

        return;

    }


    // 商品
    const product =
        products.find(
            function (item) {

                return (
                    item.id ===
                    productId
                );

            }
        );


    if (!product) {

        alert(
            "請選擇商品。"
        );

        return;

    }


    if (
        product.status !==
        "供應中"
    ) {

        alert(
            "此商品目前無法預訂。"
        );

        return;

    }


    // 尺寸
    const size =
        product.sizes.find(
            function (item) {

                return (
                    item.name ===
                    sizeName
                );

            }
        );


    if (!size) {

        alert(
            "請選擇尺寸。"
        );

        return;

    }


    // 數量
    if (
        !quantity ||
        quantity < 1
    ) {

        alert(
            "商品數量至少為 1。"
        );

        return;

    }


    // 日期
    if (
        !pickupDate
    ) {

        alert(
            "請選擇取貨日期。"
        );

        return;

    }


    if (
        !validatePickupDate(
            true
        )
    ) {

        return;

    }


    // 時間
    if (
        !pickupTime
    ) {

        alert(
            "請選擇取貨時間。"
        );

        return;

    }


    // ==================================
    // 每日供應量檢查
    // ==================================

    const sameDateQuantity =
        orders
            .filter(
                function (order) {

                    return (
                        order.productId ===
                            product.id &&
                        order.pickupDate ===
                            pickupDate &&
                        order.status !==
                            "已取消"
                    );

                }
            )
            .reduce(
                function (
                    total,
                    order
                ) {

                    return (
                        total +
                        Number(
                            order.quantity
                        )
                    );

                },
                0
            );


    if (
        sameDateQuantity +
        quantity >
        product.dailyLimit
    ) {

        const remaining =
            Math.max(
                0,
                product.dailyLimit -
                sameDateQuantity
            );


        alert(
            "此商品 " +
            pickupDate +
            " 的可預訂數量不足。\n\n" +
            "每日上限：" +
            product.dailyLimit +
            "\n" +
            "目前尚可預訂：" +
            remaining
        );


        return;

    }


    // 金額
    const total =
        size.price *
        quantity;


    const order = {

        orderNo:
            createOrderNumber(),

        customerName:
            name,

        customerPhone:
            phone,

        productId:
            product.id,

        productName:
            product.name,

        size:
            size.name,

        unitPrice:
            size.price,

        quantity:
            quantity,

        pickupDate:
            pickupDate,

        pickupTime:
            pickupTime,

        pickupMethod:
            "門市取貨",

        paymentMethod:
            "到店付款",

        candle:
            candle,

        tableware:
            tableware,

        cakeMessage:
            cakeMessage,

        note:
            note,

        total:
            total,

        status:
            "待確認",

        createdAt:
            new Date().toISOString()

    };


    orders.unshift(
        order
    );


    saveOrders();


    showSuccessOrder(
        order
    );


    renderAdminOrders();


    document.getElementById(
        "orderForm"
    ).reset();


    document.getElementById(
        "quantity"
    ).value =
        1;


    document.getElementById(
        "sizeSelect"
    ).innerHTML = `

        <option value="">
            請先選商品
        </option>

    `;


    document.getElementById(
        "pickupDate"
    ).removeAttribute(
        "max"
    );


    setMinimumPickupDate();


    updateEstimatedTotal();

}


// ======================================
// 預訂成功畫面
// ======================================

function showSuccessOrder(
    order
) {

    const detail =
        document.getElementById(
            "successOrderDetail"
        );


    detail.innerHTML = `

        <div class="order-detail-card">

            <div class="order-detail-row">
                <span>訂單編號</span>
                <strong>${order.orderNo}</strong>
            </div>

            <div class="order-detail-row">
                <span>姓名</span>
                <strong>${escapeHtml(order.customerName)}</strong>
            </div>

            <div class="order-detail-row">
                <span>手機</span>
                <strong>${order.customerPhone}</strong>
            </div>

            <div class="order-detail-row">
                <span>商品</span>
                <strong>${escapeHtml(order.productName)}</strong>
            </div>

            <div class="order-detail-row">
                <span>尺寸</span>
                <strong>${escapeHtml(order.size)}</strong>
            </div>

            <div class="order-detail-row">
                <span>數量</span>
                <strong>${order.quantity}</strong>
            </div>

            <div class="order-detail-row">
                <span>取貨日期</span>
                <strong>${order.pickupDate}</strong>
            </div>

            <div class="order-detail-row">
                <span>取貨時間</span>
                <strong>${order.pickupTime}</strong>
            </div>

            <div class="order-detail-row">
                <span>取貨方式</span>
                <strong>${order.pickupMethod}</strong>
            </div>

            <div class="order-detail-row">
                <span>付款方式</span>
                <strong>${order.paymentMethod}</strong>
            </div>

            <div class="order-detail-row">
                <span>金額</span>
                <strong>NT$ ${formatPrice(order.total)}</strong>
            </div>

            <div class="order-detail-row">
                <span>狀態</span>
                <strong>${order.status}</strong>
            </div>

        </div>

    `;


    const section =
        document.getElementById(
            "successSection"
        );


    section.classList.remove(
        "d-none"
    );


    section.scrollIntoView({
        behavior: "smooth"
    });

}


// ======================================
// 查詢我的訂單
// ======================================

function searchOrders() {

    const phone =
        document.getElementById(
            "searchPhone"
        ).value.trim();


    const result =
        document.getElementById(
            "customerOrderResult"
        );


    const phoneRule =
        /^09\d{8}$/;


    if (
        !phoneRule.test(
            phone
        )
    ) {

        alert(
            "請輸入正確的 10 碼手機號碼。"
        );

        return;

    }


    const matched =
        orders.filter(
            function (order) {

                return (
                    order.customerPhone ===
                    phone
                );

            }
        );


    if (
        matched.length === 0
    ) {

        result.innerHTML = `

            <div class="customer-order-card text-center">

                <i class="bi bi-search fs-1"></i>

                <h5 class="mt-3">
                    查無訂單
                </h5>

                <p>
                    請確認手機號碼是否正確。
                </p>

            </div>

        `;


        return;

    }


    let html = "";


    matched.forEach(
        function (order) {

            html += `

                <div class="customer-order-card">

                    <div class="d-flex
                                justify-content-between
                                flex-wrap
                                gap-2">

                        <h5>
                            ${order.orderNo}
                        </h5>

                        ${getOrderStatusBadge(
                            order.status
                        )}

                    </div>


                    <hr>


                    <div class="row">

                        <div class="col-md-6">

                            <p>
                                <strong>
                                    商品：
                                </strong>

                                ${escapeHtml(order.productName)}
                            </p>


                            <p>
                                <strong>
                                    尺寸：
                                </strong>

                                ${escapeHtml(order.size)}
                            </p>


                            <p>
                                <strong>
                                    數量：
                                </strong>

                                ${order.quantity}
                            </p>

                        </div>


                        <div class="col-md-6">

                            <p>
                                <strong>
                                    取貨：
                                </strong>

                                ${order.pickupDate}
                                ${order.pickupTime}
                            </p>


                            <p>
                                <strong>
                                    付款：
                                </strong>

                                ${order.paymentMethod}
                            </p>


                            <p>
                                <strong>
                                    金額：
                                </strong>

                                NT$ ${formatPrice(order.total)}
                            </p>

                        </div>

                    </div>

                </div>

            `;

        }
    );


    result.innerHTML =
        html;

}


// ======================================
// 店員訂單管理
// ======================================

function renderAdminOrders() {

    const body =
        document.getElementById(
            "adminOrderBody"
        );


    let displayOrders =
        orders;


    if (
        currentAdminFilter !==
        "全部"
    ) {

        displayOrders =
            orders.filter(
                function (order) {

                    return (
                        order.status ===
                        currentAdminFilter
                    );

                }
            );

    }


    if (
        displayOrders.length === 0
    ) {

        body.innerHTML = `

            <tr>

                <td colspan="10"
                    class="text-center py-5">

                    目前沒有訂單資料

                </td>

            </tr>

        `;


        return;

    }


    let html = "";


    displayOrders.forEach(
        function (order) {

            html += `

                <tr>

                    <td>
                        <strong>
                            ${order.orderNo}
                        </strong>
                    </td>


                    <td>

                        ${escapeHtml(order.customerName)}

                        <br>

                        <small>
                            ${order.customerPhone}
                        </small>

                    </td>


                    <td>
                        ${escapeHtml(order.productName)}
                    </td>


                    <td>
                        ${escapeHtml(order.size)}
                    </td>


                    <td>
                        ${order.quantity}
                    </td>


                    <td>
                        ${order.pickupDate}
                    </td>


                    <td>
                        ${order.pickupTime}
                    </td>


                    <td>
                        NT$ ${formatPrice(order.total)}
                    </td>


                    <td>

                        <select class="form-select
                                      form-select-sm
                                      status-select"

                                onchange="changeOrderStatus(
                                    '${order.orderNo}',
                                    this.value
                                )">

                            ${createStatusOptions(
                                order.status
                            )}

                        </select>

                    </td>


                    <td>

                        <button class="btn
                                       btn-sm
                                       btn-outline-danger"

                                onclick="deleteOrder(
                                    '${order.orderNo}'
                                )">

                            刪除

                        </button>

                    </td>

                </tr>

            `;

        }
    );


    body.innerHTML =
        html;

}


// ======================================
// 商品供應管理
// ======================================

function renderProductManagement() {

    const body =
        document.getElementById(
            "productManageBody"
        );


    let html = "";


    products.forEach(
        function (product) {

            const sizeText =
                product.sizes
                    .map(
                        function (size) {

                            return (
                                escapeHtml(size.name) +
                                " NT$" +
                                formatPrice(size.price)
                            );

                        }
                    )
                    .join("<br>");


            html += `

                <tr>

                    <td>

                        <strong>
                            ${escapeHtml(product.name)}
                        </strong>

                    </td>


                    <td>
                        ${product.categoryName}
                    </td>


                    <td>
                        ${sizeText}
                    </td>


                    <td>

                        <select class="form-select
                                      form-select-sm"

                                onchange="changeProductStatus(
                                    ${product.id},
                                    this.value
                                )">

                            <option value="供應中"
                                ${
                                    product.status === "供應中"
                                        ? "selected"
                                        : ""
                                }>

                                供應中

                            </option>


                            <option value="暫停供應"
                                ${
                                    product.status === "暫停供應"
                                        ? "selected"
                                        : ""
                                }>

                                暫停供應

                            </option>


                            <option value="售完"
                                ${
                                    product.status === "售完"
                                        ? "selected"
                                        : ""
                                }>

                                售完

                            </option>

                        </select>

                    </td>


                    <td>

                        <input type="number"
                               class="form-control
                                      form-control-sm"
                               min="1"
                               max="999"
                               value="${product.dailyLimit}"

                               onchange="changeDailyLimit(
                                   ${product.id},
                                   this.value
                               )">

                    </td>


                    <td>

                        <input type="number"
                               class="form-control
                                      form-control-sm"
                               min="2"
                               max="90"
                               value="${product.availableDays}"

                               onchange="changeAvailableDays(
                                   ${product.id},
                                   this.value
                               )">

                    </td>

                </tr>

            `;

        }
    );


    body.innerHTML =
        html;

}


// ======================================
// 改商品狀態
// ======================================

function changeProductStatus(
    productId,
    newStatus
) {

    const product =
        products.find(
            function (item) {

                return (
                    item.id ===
                    productId
                );

            }
        );


    if (!product) {
        return;
    }


    product.status =
        newStatus;


    saveProducts();


    renderProducts();

    createProductOptions();

    renderProductManagement();

}


// ======================================
// 每日供應上限
// ======================================

function changeDailyLimit(
    productId,
    value
) {

    const product =
        products.find(
            function (item) {

                return (
                    item.id ===
                    productId
                );

            }
        );


    if (!product) {
        return;
    }


    let newValue =
        Number(value);


    if (
        !newValue ||
        newValue < 1
    ) {

        newValue = 1;

    }


    product.dailyLimit =
        newValue;


    saveProducts();

}


// ======================================
// 可預訂天數
// ======================================

function changeAvailableDays(
    productId,
    value
) {

    const product =
        products.find(
            function (item) {

                return (
                    item.id ===
                    productId
                );

            }
        );


    if (!product) {
        return;
    }


    let newValue =
        Number(value);


    if (
        !newValue ||
        newValue < 2
    ) {

        newValue = 2;

    }


    product.availableDays =
        newValue;


    saveProducts();

}


// ======================================
// 訂單狀態選項
// ======================================

function createStatusOptions(
    currentStatus
) {

    const statuses = [

        "待確認",
        "已確認",
        "製作中",
        "已完成",
        "已取貨"

    ];


    return statuses
        .map(
            function (status) {

                const selected =
                    status ===
                    currentStatus
                        ? "selected"
                        : "";


                return `

                    <option value="${status}"
                            ${selected}>

                        ${status}

                    </option>

                `;

            }
        )
        .join("");

}


// ======================================
// 改變訂單狀態
// ======================================

function changeOrderStatus(
    orderNo,
    newStatus
) {

    const order =
        orders.find(
            function (item) {

                return (
                    item.orderNo ===
                    orderNo
                );

            }
        );


    if (!order) {
        return;
    }


    order.status =
        newStatus;


    saveOrders();


    renderAdminOrders();

}


// ======================================
// 篩選訂單
// ======================================

function filterAdminOrders(
    status,
    button
) {

    currentAdminFilter =
        status;


    document
        .querySelectorAll(
            ".admin-filter"
        )
        .forEach(
            function (item) {

                item.classList.remove(
                    "active"
                );

            }
        );


    button.classList.add(
        "active"
    );


    renderAdminOrders();

}


// ======================================
// 刪除訂單
// ======================================

function deleteOrder(
    orderNo
) {

    const confirmed =
        confirm(
            "確定要刪除此訂單嗎？"
        );


    if (!confirmed) {
        return;
    }


    orders =
        orders.filter(
            function (order) {

                return (
                    order.orderNo !==
                    orderNo
                );

            }
        );


    saveOrders();


    renderAdminOrders();

}


// ======================================
// 商品分類
// ======================================

function setupCategoryFilter() {

    const buttons =
        document.querySelectorAll(
            ".category-btn"
        );


    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    buttons.forEach(
                        function (btn) {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    const category =
                        button.dataset.category;


                    document
                        .querySelectorAll(
                            ".product-item"
                        )
                        .forEach(
                            function (item) {

                                if (
                                    category === "all" ||
                                    item.dataset.category ===
                                    category
                                ) {

                                    item.style.display =
                                        "block";

                                } else {

                                    item.style.display =
                                        "none";

                                }

                            }
                        );

                }
            );

        }
    );

}


// ======================================
// LocalStorage 訂單
// ======================================

function saveOrders() {

    localStorage.setItem(
        "sweetDayOrders",
        JSON.stringify(
            orders
        )
    );

}


function loadOrders() {

    const saved =
        localStorage.getItem(
            "sweetDayOrders"
        );


    if (!saved) {

        orders = [];

        return;

    }


    try {

        orders =
            JSON.parse(
                saved
            );

    } catch (error) {

        orders = [];

    }

}


// ======================================
// LocalStorage 商品
// ======================================

function saveProducts() {

    localStorage.setItem(
        "sweetDayProducts",
        JSON.stringify(
            products
        )
    );

}


function loadProducts() {

    const saved =
        localStorage.getItem(
            "sweetDayProducts"
        );


    if (!saved) {
        return;
    }


    try {

        products =
            JSON.parse(
                saved
            );

    } catch (error) {

        console.log(
            "商品資料讀取失敗"
        );

    }

}


// ======================================
// 訂單編號
// ======================================

function createOrderNumber() {

    const now =
        new Date();


    const date =
        formatDateInput(
            now
        ).replaceAll(
            "-",
            ""
        );


    const hours =
        String(
            now.getHours()
        ).padStart(
            2,
            "0"
        );


    const minutes =
        String(
            now.getMinutes()
        ).padStart(
            2,
            "0"
        );


    const seconds =
        String(
            now.getSeconds()
        ).padStart(
            2,
            "0"
        );


    const random =
        Math.floor(
            Math.random() *
            90
        ) + 10;


    return (
        "SD" +
        date +
        hours +
        minutes +
        seconds +
        random
    );

}


// ======================================
// 日期字串 → 本地日期
// 避免 UTC 時差問題
// ======================================

function parseLocalDate(
    value
) {

    const parts =
        value.split("-");


    return new Date(
        Number(parts[0]),
        Number(parts[1]) - 1,
        Number(parts[2])
    );

}


// ======================================
// 日期轉 input 格式
// ======================================

function formatDateInput(
    date
) {

    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        );


    return (
        year +
        "-" +
        month +
        "-" +
        day
    );

}


// ======================================
// 日期顯示
// ======================================

function formatDisplayDate(
    date
) {

    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        );


    return (
        year +
        "/" +
        month +
        "/" +
        day
    );

}


// ======================================
// 金額格式
// ======================================

function formatPrice(
    value
) {

    return Number(
        value
    ).toLocaleString(
        "zh-TW"
    );

}


// ======================================
// 訂單狀態 Badge
// ======================================

function getOrderStatusBadge(
    status
) {

    let cssClass =
        "status-available";


    if (
        status === "待確認"
    ) {

        cssClass =
            "status-pause";

    }


    if (
        status === "已完成" ||
        status === "已取貨"
    ) {

        cssClass =
            "status-available";

    }


    return `

        <span class="status ${cssClass}">
            ${status}
        </span>

    `;

}


// ======================================
// HTML 安全
// ======================================

function escapeHtml(
    text
) {

    if (!text) {

        return "";

    }


    return String(text)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}
