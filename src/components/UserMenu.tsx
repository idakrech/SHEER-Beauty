const UserMenu = () => {

const menuItems: string[] = ["Account details", "Order history", "Favorites", "Log out"]

  return (
   <ul className="p-2">
    {menuItems.map((item, index) => (
        <li key={index} className='hover:bg-gray-200'>
            <p>{item}</p>
        </li>
    ))}
   </ul>
  )
}

export default UserMenu