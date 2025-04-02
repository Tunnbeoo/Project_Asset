import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ThanhTimKiem = () => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (query.length === 0) {
      setProducts([]);
      return;
    }

    fetch(`http://localhost:3000/sp?name=${query}`)
      .then((res) => res.json())
      .then((data) => {
        const filteredProducts = data.filter(product =>
          product.ten_sp.toLowerCase().includes(query.toLowerCase())
        );
        setProducts(filteredProducts);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, [query]);

  return (
    <div className="modal-dialog modal-xl">
      <div className="modal-content">
        <div className="modal-header">
          <i style={{ fontSize: '25px' }} className="bi bi-search"></i>
          <input
            style={{ border: 'none', padding: '5px', fontSize: '20px', width: '100%', outline: 'none', paddingLeft: '20px' }}
            type="search"
            placeholder="Tìm kiếm sản phẩm..."
            aria-label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          {query.length === 0 ? (
            <div>Vui lòng nhập từ khóa sản phẩm!</div>
          ) : (
            <div id="spxn">
              {products.length === 0 ? (
                <div>Không tìm thấy sản phẩm...</div>
              ) : (
                products.map((sp, i) => (
                  <div className="sp" key={i}>
                    <img className="hinh_spxn"  src={sp.hinh} title={sp.ten_sp.toUpperCase()} alt={sp.ten_sp} />
                    <div>
                      <p className="text_tensp">
                      <Link to= {`/sanpham/${sp.id}/${sp.id_loai}`} activeClassName="a">{sp.ten_sp}</Link>
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', transform: 'translateY(-15px)' }}>
                        <p className="gia" style={{ color: 'red', fontSize: '15px', marginRight: '8px', marginTop: '30px' }}>
                          {Number(sp.gia).toLocaleString("vi")} VNĐ
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThanhTimKiem;
