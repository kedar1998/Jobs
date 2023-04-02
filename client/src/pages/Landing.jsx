import logo from '../assets/images/logo.svg'
import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'

const Landing = () => {
  return (
    <Wrapper>
        <nav>
            <img src={logo} className='logo' alt="LOGO" />
        </nav>
        <div className='container page'>
        
            {/* LEFT */}
            <div className='info'>
                <h1>job <span>tracking</span> app</h1>
                <p>Laborum tempor non mollit sint esse ipsum esse sint est adipisicing aliquip in ut ullamco. Culpa enim adipisicing do minim aliquip elit ipsum officia commodo proident in quis. Et labore esse ipsum excepteur sint minim consectetur reprehenderit voluptate dolore amet pariatur non esse. Nulla minim pariatur ex eu commodo adipisicing aute. Irure aute nostrud consectetur sunt esse. Consequat esse cillum laborum exercitation.</p>
                <button className='btn btn-hero'>Login/Register</button>
            </div>

            {/* RIGHT */}
            <img src={main} alt="job hunt" className='img main-img' />
        </div>
    </Wrapper>
  )
}


export default Landing