import { Card, Button } from 'antd';


function ProductCard({product, isVendor}){
    return (
        // <div>
        //     <img src="product.imageUrl" alt="product.name" />
        //     <h3>{product.name}</h3>
        //     <h3>${product.price}</h3>
        //     <button>Add</button>
        //     {isVendor && <button>Edit</button>}
        // </div>
        <Card
            cover={<img src={product.imageUrl} alt={product.name} className='h-48 object-cover'/>}
            className='w-full'>
            <h3 className='text-base font-medium'>{product.name}</h3>
            <p className='text-lg font-bold mt-1'>${product.price}</p>
            {
                product.stock === 0 && (
                    <span className='text-red-500 text-sm'>Out of Stock</span>
                )
            }
            <div className='flex gap-2 mt-3'>
                <Button type='primary' disabled={product.stock === 0}>Add</Button>
                {isVendor && <Button>Edit</Button>}
            </div>
        </Card>
        
    )
}

export default ProductCard;