import './prnavbar.css'

export default function PrimaryNavBar() {
  return (
    <div className='primaryNav'>
       <div className='topleft'>
          <img src="./images/me.svg" alt="" />
      </div>
      <div className="topright">
        <ul>
          <li>English</li>
          <li>Mathematics</li>
          <li>Science</li>
          <li>Geography</li>
        </ul>
      </div>
    </div>
  )
}
