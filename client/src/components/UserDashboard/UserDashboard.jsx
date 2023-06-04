import React, {useState} from 'react'
import BuyerDashboard from './BuyerDashboard'
import SellerDashboard from './SellerDashboard'
import Toggle from './Toggle'
import ProfileOverview from './ProfileOverview'

const UserDashboard = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <div className="flex flex-col justify-center items-center pt-16 mx-8">
      <div className="min-h-screen">
        <ProfileOverview />
        <Toggle
          name1={'Buyer Profile'}
          name2={'Seller Profile'}
          toggle={toggle}
          setToggle={setToggle}
        />
        {toggle ? <BuyerDashboard /> : <SellerDashboard />}
      </div>
    </div>
  );
}

export default UserDashboard