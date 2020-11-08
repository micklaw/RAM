using Dotented;
using Dotented.Interfaces;
using RAM.Components;

namespace RAM.Pages
{
    public class About : BasePage
    {
        public static string Query = @"
            query {
                pages: aboutCollection (limit: 1) {
                    items {
                        __typename
                        url
                        pageTitle
                        pageDescription
                        content
                        backgroundImage {
                            __typename
                            title
                            url
                        }
                        testimonials: testimonialsCollection {
                            items {
                                __typename
                                content
                                person
                            }
                        }
                    }
                }
            }
        ";

        public Asset BackgroundImage { get; set; }

        public string Content { get; set; }

        public DotentedCollection<Testimonial> Testimonials { get; set; }
    }
}