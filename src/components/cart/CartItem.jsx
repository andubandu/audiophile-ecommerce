import { useCart } from '../../contexts/CartContext';

function formatPrice(price) {
  return `$${price.toLocaleString()}`;
}

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleDecrease = () => {
    if (item.quantity === 1) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const shortName = item.name?.split(' ').slice(0, 2).join(' ');

  return (
    <li className="flex items-center mb-3">
      <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden mr-2">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1">
        <h6 className="text-[0.9375rem] mb-1">{shortName}</h6>
        <p className="text-sm font-bold text-black/50">{formatPrice(item.price)}</p>
      </div>

      <div className="flex items-center bg-gray-200 px-1 w-24 h-8">
        <button
          onClick={handleDecrease}
          className="bg-none border-none text-black/25 font-bold text-lg w-4 cursor-pointer transition-colors duration-300 hover:text-primary"
        >
          -
        </button>
        <span className="flex-1 text-center font-bold text-[0.8125rem]">{item.quantity}</span>
        <button
          onClick={handleIncrease}
          className="bg-none border-none text-black/25 font-bold text-lg w-4 cursor-pointer transition-colors duration-300 hover:text-primary"
        >
          +
        </button>
      </div>
    </li>
  );
}

export default CartItem;
