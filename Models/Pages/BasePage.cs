using Dotented.Interfaces;

namespace RAM.Pages
{
    public abstract class BasePage : DotentedContent
    {
        public string PageTitle { get; set; }

        public string PageDescription { get; set; }
    }
}