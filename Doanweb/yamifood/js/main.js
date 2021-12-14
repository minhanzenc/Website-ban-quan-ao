async function getProducts(){
    const listProduct = document.getElementById('listProduct')
    if(listProduct == null) return
    try{
        const config = {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            }
        }
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('timkiem') || '';
        const res = await fetch(`http://127.0.0.1:8000/sanpham/?ten=${myParam}`,config)
        if(res.status === 200){
            const data = await res.json()
            listProduct.innerHTML = ''
            if(data.results.length !== 0 )
                data.results.forEach(product => {
                    let chi_tiet = ""
                    product.chitietsanpham_set.forEach(e => {
                        chi_tiet += `
                            <option value=${e.id}>${e.size} - ${e.mau_sac}</option>
                        `
                    })
                    listProduct.innerHTML += 
                    `   <div class="col-lg-4 col-md-6 special-grid dinner">
                            <div class="gallery-single fix">
                                <img src=${product.chitietsanpham_set[0].hinh} class="img-fluid" alt="Image">
                                <div class="why-text" >
                                    <h4>${product.ten_san_pham}</h4>
                                    <p>${product.gioi_thieu}</p>
                                    <select id="sanphamchon${product.id}">
                                        ${chi_tiet}
                                    </select>
                                    <h5> ${numberWithCommas(product.gia)} VND</h5>
                                    <button onclick="addToCart(${product.id},'${product.ten_san_pham}',${product.gia}, '${product.chitietsanpham_set[0].hinh}')">thêm giỏ hàng</button>
                                </div>
                            </div>
                        </div>
                    `
                });
            else
                listProduct.innerHTML = `<h1 style="text-align:center"> Không tìm thấy sản phẩm tương ứng</h1>`
        }
        else{
            console.log("loi")
        }
    } catch(err){
        console.log(err)
    }
}