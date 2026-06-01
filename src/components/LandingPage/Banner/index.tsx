"use client";

import { ChevronRight } from "lucide-react";
import { useKeenSlider } from "keen-slider/react";

import { useModal } from "@/hooks/common";

import "keen-slider/keen-slider.min.css";

import ModalProvider from "@/components/ModalProvider";

const Banner = () => {
  const bannerSlides = [
    {
      title: "Chăm sóc sức khỏe toàn diện",
      subtitle: "Đội ngũ bác sĩ giàu kinh nghiệm, trang thiết bị hiện đại",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=600&fit=crop",
    },
    {
      title: "Đặt lịch khám online dễ dàng",
      subtitle: "Tiết kiệm thời gian, không cần chờ đợi",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=600&fit=crop",
    },
    {
      title: "Tư vấn sức khỏe 24/7",
      subtitle: "Luôn đồng hành cùng sức khỏe của bạn",
      image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1200&h=600&fit=crop",
    },
  ];

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      loop: true,
      slides: {
        perView: 1,
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 5000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );
  const modalBookNow = useModal();
  const handleBookNow = () => {
    modalBookNow.handleShow();
  };
  return (
    <section className="h-fit">
      <div ref={sliderRef} className="keen-slider min-h-[60rem]">
        {bannerSlides.map((slide, index) => (
          <div
            key={index}
            className="keen-slider__slide"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="max-w-[100rem] mx-auto px-4 h-full flex items-center">
              <div className="text-white max-w-2xl">
                <h2 className="text-5xl font-bold mb-4">{slide.title}</h2>
                <p className="text-xl mb-8">{slide.subtitle}</p>
                <button
                  className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-blue-50 transition transform hover:scale-105 shadow-xl"
                  onClick={handleBookNow}
                >
                  Đặt lịch ngay <ChevronRight className="inline w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Banner;
