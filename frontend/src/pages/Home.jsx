import Navbar from "../Components/Navbar";
import { MdCamera } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { RiDiscountPercentFill } from "react-icons/ri";
import Slider from "react-infinite-logo-slider";
import { HiCheck } from "react-icons/hi";
import { useRef } from "react";
import Footer from "../Components/Footer";

const Home = () => {
  const pricingRef = useRef(null);
  const services = [
    {
      icon: <MdCamera className="w-8 h-8 text-xblue" />,
      title: "Photography",
      description:
        "Experience the magic of memories, captured with precision and passion.",
    },
    {
      icon: <FaVideo className="w-8 h-8 text-xblue" />,
      title: "Videography",
      description:
        "Watch your story unfold in cinematic brilliance, every frame a masterpiece.",
    },
    {
      icon: <IoStatsChart className="w-8 h-8 text-xblue" />,
      title: "Marketing",
      description:
        "Ignite your brand's online presence, reaching new heights with strategy.",
    },
  ];

  const team = [
    {
      name: "Sahriar Sayem",
      role: "CEO & Founder",
      image: "src/assets/sayem.jpg",
    },
    {
      name: "Md Iftaykhar Mahmud",
      role: "Chief Marketing Officer",
      image: "src/assets/iftaykhar.jpg",
    },
    {
      name: "Mehrab Hossain Opi",
      role: "Video Editor",
      image: "src/assets/opi.jpg",
    },
    {
      name: "Rafsun Karim",
      role: "Art Director",
      image: "src/assets/rafsun.jpg",
    },
  ];

  const pricing = [
    {
      title: "Food Photography",
      subtitle: "Starter",
      price: "20K",
      perks: [
        "7 days of shoot",
        "10-15 dishes",
        "2/3 pictures per dish",
        "Single backdrop",
        "Food styling",
        "Custom props",
      ],
      popular: true,
    },
    {
      title: "Videography",
      subtitle: "Starter",
      price: "25K",
      perks: [
        "7 days of shoot",
        "1 commercial video",
        "Interior, Exterior shoot",
        "Food styling shoot",
      ],
      popular: false,
    },
    {
      title: "Digital Marketing",
      subtitle: "Starter",
      price: "15K",
      perks: [
        "30 days of work",
        "Page optimization",
        "Business page creation",
        "Advance Ad campaign",
        "Pixel setup",
        "Marketing with trends",
      ],
      popular: false,
    },
  ];
  return (
    <div className="bg-xlightestgray">
      <Navbar />

      {/* Hero */}

      <div className="flex flex-col items-center gap-y-10 px-2 py-8 lg:py-24">
        <div className="text-xdark text-[40px] lg:text-[72px] font-black uppercase text-center">
          We bring Your Stories <span className="text-xblue">to Life</span>,
          <br />
          Through the Lens.
        </div>
        <div className="text-[16px] lg:text-[24px] font-light text-xlightgray text-center -mt-8">
          Creating remarkable stories with creativity,{" "}
          <br className="block lg:hidden" />
          with our passionate crew.
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-x-4 gap-y-2">
          <button className="w-52 lg:w-fit border border-xblue bg-xblue uppercase text-white hover:bg-sky-500 hover:border-sky-500 transition-all duration-200 px-6 py-3 flex gap-x-4 justify-center items-center">
            <div className="text-[12px] lg:text-[16px]">request a shoot</div>
            <div>
              <MdCamera className="w-5 lg:w-8 h-5 lg:h-8 text-white" />
            </div>
          </button>
          <button
            onClick={() =>
              pricingRef?.current?.scrollIntoView({ behavior: "smooth" })
            }
            className="w-52 lg:w-fit border border-xblue uppercase text-xblue transition-all duration-200 px-6 py-3 flex gap-x-4 justify-center items-center"
          >
            <div className="text-[12px] lg:text-[16px]">see pricing plans</div>
            <div>
              <RiDiscountPercentFill className="w-5 lg:w-8 h-5 lg:h-8 text-xblue" />
            </div>
          </button>
        </div>
      </div>

      {/* Services */}

      <div className="py-8 lg:py-24">
        <div className="text-[20px] text-xdark uppercase font-bold lg:text-[40px] text-center mb-6 lg:mb-20">
          Discover Our Awesome Services
        </div>
        <div className="flex flex-col lg:flex-row justify-between mx-2 lg:mx-32 gap-y-2">
          {services.map((service, i) => (
            <div
              key={i}
              className="w-full lg:w-[420px] border border-xblue py-5 lg:py-10 px-4 lg:px-8 flex flex-col gap-y-2 lg:gap-y-6"
            >
              <div className="flex items-center gap-x-3">
                <div>{service.icon}</div>
                <div className="text-xdark text-[20px] lg:text-[28px]">
                  {service.title}
                </div>
              </div>
              <div className="text-xgray text-[16px] lg:text-[20px] font-light">
                {service.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gallery */}

      <div className="py-8 lg:py-24 mx-2 lg:mx-32">
        <div className="text-[20px] text-xdark uppercase font-bold lg:text-[40px] text-center mb-6 lg:mb-20">
          Explore Our Creative Projects
        </div>
        <div className="grid grid-cols-3 lg:grid-cols-5 gap-3 overflow-auto h-[640px]">
          <img src="src/assets/food.png" alt="food" className="w-full" />
          <img src="src/assets/food.png" alt="food" className="w-full" />
          <img src="src/assets/food.png" alt="food" className="w-full" />
          <img src="src/assets/food.png" alt="food" className="w-full" />
          <img src="src/assets/food.png" alt="food" className="w-full" />
          <img src="src/assets/food.png" alt="food" className="w-full" />
          <img src="src/assets/food.png" alt="food" className="w-full" />
          <img src="src/assets/food.png" alt="food" className="w-full" />
          <img src="src/assets/food.png" alt="food" className="w-full" />
          <img src="src/assets/food.png" alt="food" className="w-full" />
          <img src="src/assets/food.png" alt="food" className="w-full" />
          <img src="src/assets/food.png" alt="food" className="w-full" />
          <img src="src/assets/food.png" alt="food" className="w-full" />
          <img src="src/assets/food.png" alt="food" className="w-full" />
          <img src="src/assets/food.png" alt="food" className="w-full" />
          <img src="src/assets/food.png" alt="food" className="w-full" />
          <img src="src/assets/food.png" alt="food" className="w-full" />
          <img src="src/assets/food.png" alt="food" className="w-full" />
          <img src="src/assets/food.png" alt="food" className="w-full" />
          <img src="src/assets/food.png" alt="food" className="w-full" />
          <img src="src/assets/food.png" alt="food" className="w-full" />
          <img src="src/assets/food.png" alt="food" className="w-full" />
          <img src="src/assets/food.png" alt="food" className="w-full" />
          <img src="src/assets/food.png" alt="food" className="w-full" />
          <img src="src/assets/food.png" alt="food" className="w-full" />
          <img src="src/assets/food.png" alt="food" className="w-full" />
          <img src="src/assets/food.png" alt="food" className="w-full" />
          <img src="src/assets/food.png" alt="food" className="w-full" />
          <img src="src/assets/food.png" alt="food" className="w-full" />
          <img src="src/assets/food.png" alt="food" className="w-full" />
          <img src="src/assets/food.png" alt="food" className="w-full" />
          <img src="src/assets/food.png" alt="food" className="w-full" />
          <img src="src/assets/food.png" alt="food" className="w-full" />
          <img src="src/assets/food.png" alt="food" className="w-full" />
          <img src="src/assets/food.png" alt="food" className="w-full" />
        </div>
      </div>

      {/* Clients */}

      <div className="py-8 lg:py-24">
        <div className="text-[20px] text-xdark uppercase font-bold lg:text-[40px] text-center mb-6 lg:mb-20">
          View Our Cherished Customers
        </div>
        <Slider
          width="250px"
          duration={40}
          pauseOnHover={false}
          blurBorders={true}
          blurBoderColor={"#FAFAFA"}
        >
          <Slider.Slide>
            <img
              src="src/assets/logo.png"
              alt="any"
              className="w-24 lg:w-32 grayscale"
            />
          </Slider.Slide>
          <Slider.Slide>
            <img
              src="src/assets/logo.png"
              alt="any2"
              className="w-24 lg:w-32"
            />
          </Slider.Slide>
          <Slider.Slide>
            <img
              src="src/assets/logo.png"
              alt="any3"
              className="w-24 lg:w-32"
            />
          </Slider.Slide>
        </Slider>
      </div>

      {/* Team */}

      <div className="py-8 lg:py-24">
        <div className="text-[20px] text-xdark uppercase font-bold lg:text-[40px] text-center mb-6 lg:mb-20">
          Meet Our Dedicated Team
        </div>
        <div className="mx-2 lg:mx-32 grid grid-cols-2 lg:grid-cols-4 items-center">
          {team.map((member, i) => (
            <div key={i} className="flex justify-center">
              <div className="relative flex flex-col items-center lg:gap-y-3 gap-y-1.5 mb-2">
                <div className="h-[150px] w-[150px] lg:h-[250px] lg:w-[250px] bg-xlightergray"></div>
                <div className="absolute top-[5px] left-[5px]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-[140px] h-[140px] lg:w-[240px] lg:h-[240px]"
                  />
                </div>
                <div className="text-xdark text-[16px] lg:text-[24px] font-bold">
                  {member.name}
                </div>
                <div className="text-xdark text-[12px] lg:text-[16px] font-light">
                  {member.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing */}

      <div className="py-8 lg:py-24" ref={pricingRef}>
        <div className="text-[20px] text-xdark uppercase font-bold lg:text-[40px] text-center mb-6 lg:mb-20">
          Pick or Personalize Your Plan
        </div>
        <div className="mx-2 lg:mx-32 flex flex-wrap justify-evenly gap-2">
          {pricing.map((plan, i) => (
            <div
              key={i}
              className="relative overflow-hidden flex flex-col justify-between gap-y-8 bg-white px-20 py-10"
            >
              {plan.popular && (
                <div className="absolute bg-xblue px-12 py-1 -right-12 top-6 rotate-45 text-[16px] text-white font-semibold text-center uppercase">
                  Popular
                </div>
              )}
              <div className="flex flex-col gap-y-8">
                <div className="text-[24px] text-xdark font-semibold text-center">
                  {plan.title}
                </div>
                <div className="text-[16px] text-xlightgray font-light text-center -mt-[24px]">
                  {plan.subtitle}
                </div>
                <div className="text-[36px] text-xblue font-bold text-center">
                  {plan.price} BDT
                </div>
                <div className="flex flex-col gap-y-6">
                  {plan.perks.map((perk, i) => (
                    <div key={i} className="flex items-center gap-x-2">
                      <HiCheck className="w-5 h-5 text-xblue" />
                      <div className="text-[16px] text-xdark font-bold">
                        {perk}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center gap-y-2">
                <button className="border border-xblue bg-xblue text-white py-2 w-full font-semibold text-[20px] text-center">
                  Choose Plan
                </button>
                <button className="border border-xblue bg-white text-xblue py-2 w-full font-semibold text-[20px] text-center">
                  Call to Customize
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
