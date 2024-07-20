
// import checklist_img from '/images/CheckList-Icon.png'

import { ChecklistImg } from "@/global/images";
export const AboutUs = ()=>{
return(
<div className='flex-col w-full h-full relative'  >
<h2 className='text-accent leading-[33.6px] md:leading-[43.2px] xl:leading-[57.6px] text-[28px] md:text-[36px] xl:text-[46px]  md:text-start '>Are you satisfied <br className="lg:hidden"/>with our<br className=" hidden"/> company?</h2>
<p className='text-customRed absolute italic text-[18px] md:text-[28px] xl:text-[40px] leading-[20px] md:leading-[36px] xl:leading-[48px] rotate-[-18.58deg] md:bottom-5 lg:static lg:text-end lg:rotate-0
'>Tell about us <br className="lg:hidden"/>your friends<br/> and <span className="lg:font-bold">get discount!</span></p>
<div className=' absolute w-[133.3px] h-[150.73px] md:w-[311px] md:h-[390px] lg:w-[500.92px] lg:h-[541.29px] xl:w-[521.07px] xl:h-[531.43px] right-[-40px] md:right-[-60px] lg:right-[80px] xl:right-[230px] bottom-[-40px] md:bottom-[-60px] lg:bottom-[-90px] rotate-6 md:rotate-[-11deg] '><ChecklistImg/></div>
</div>


)

}