import React from 'react'
import Header from '../common/homepage/header'
import Hero from '../common/homepage/hero'
import Update from '../common/homepage/updatesection'
import About from '../common/homepage/about'
import Announcement from '../common/homepage/announcement'
import Footer from '../common/homepage/footer'
import Contact from '../common/homepage/contact'
import FAQ from '../common/homepage/faq'

const Homepage = () => {
  return (
    <>
      <Header />
      <main className=' min-h-screen'>
        <section id="home">
          <Hero />
        </section>
        <section id="about-us">
          <About />
        </section>
        <Update />
        <section id="announcement" className="min-h-screen ">
          <Announcement />
        </section>

        <section id="contact-us" className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-white dark:bg-gray-900 transition-colors duration-300 p-4 md:p-8"
        >
          <div className="col-span-1 h-full pt-10">
            <FAQ />
          </div>
          <div className="col-span-1 h-full pt-10">
            <Contact />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Homepage