
import PropTypes                from "prop-types";
import Image                    from 'next/image';
import Link                     from 'next/link';
import styles                   from './logo.module.scss';
function Logo ({className,src, alt,...rest }) {
    const onerror=(e)=>{
        if(e.type === "error"){e.target.src = "/images/icons/NoImageFound.jpg";}
    };
    return(
           <Link href="/" passHref>
                <div className={styles.siteLogo} >
                    <img  src={src ? src : "/images/header/PaisabazaarLogo.svg"} width={175} height={29} className={`${className ? styles[className] : ""} ${styles.Logo}`} alt={alt ? alt : "Logo"}  onError={(e)=>onerror(e)} {...rest}/> 
                </div>
            </Link>
           );
}

Logo.propTypes = {
    className               : PropTypes.string,
    src                     : PropTypes.string,
    alt                     : PropTypes.string
};

export default Logo;

