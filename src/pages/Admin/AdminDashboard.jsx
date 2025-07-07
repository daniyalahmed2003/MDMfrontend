import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice";
import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import OrderList from "./OrderList";
import Loader from "../../components/Loader";
import axios from "axios";
// import axios from "../../utils/axios"; // update path according to file location


const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers, isLoading: loadingCustomers } = useGetUsersQuery();
  const { data: orders, isLoading: loadingOrders } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [chartState, setChartState] = useState({
    options: {
      chart: {
        type: "line",
        background: "#fff",
        foreColor: "#333",
      },
      colors: ["#4f46e5"], // Indigo color
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#333"]
        }
      },
      stroke: {
        curve: "smooth",
        width: 3,
      },
      title: {
        text: "Sales Trend",
        align: "left",
        style: {
          color: "#333",
          fontSize: "16px",
          fontWeight: "bold"
        }
      },
      grid: {
        borderColor: "#e5e7eb",
        strokeDashArray: 4,
      },
      markers: {
        size: 5,
        colors: ["#4f46e5"],
        strokeWidth: 0,
      },
      xaxis: {
        categories: [],
        title: {
          text: "Date",
          style: {
            color: "#6b7280"
          }
        },
        labels: {
          style: {
            colors: "#6b7280"
          }
        }
      },
      yaxis: {
        title: {
          text: "Sales ($)",
          style: {
            color: "#6b7280"
          }
        },
        min: 0,
        labels: {
          style: {
            colors: "#6b7280"
          },
          formatter: (value) => `$${value.toFixed(2)}`
        }
      },
      tooltip: {
        theme: "light",
        style: {
          fontSize: "12px"
        }
      }
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setChartState(prev => ({
        ...prev,
        options: {
          ...prev.options,
          xaxis: {
            ...prev.options.xaxis,
            categories: formattedSalesDate.map(item => item.x),
          },
        },
        series: [
          { name: "Sales", data: formattedSalesDate.map(item => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

  if (isLoading || loadingCustomers || loadingOrders) {
    return <Loader />;
  }

  return (
    <div className="pt-[90px] bg-gray-50 min-h-screen">
      <AdminMenu />

      <section className="xl:ml-[4rem] md:ml-[0rem] p-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <StatCard 
            icon="$"
            title="Sales"
            value={sales?.totalSales.toFixed(2)}
            color="bg-indigo-100 text-indigo-600"
          />
          <StatCard 
            icon="👥"
            title="Customers"
            value={customers?.length}
            color="bg-green-100 text-green-600"
          />
          <StatCard 
            icon="📦"
            title="All Orders"
            value={orders?.totalOrders}
            color="bg-blue-100 text-blue-600"
          />
        </div>

        {/* Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm mt-8 max-w-6xl mx-auto">
          <Chart
            options={chartState.options}
            series={chartState.series}
            type="line"
            height={350}
          />
        </div>

        {/* Order List */}
        <div className="mt-8 max-w-6xl mx-auto">
          <OrderList />
        </div>
      </section>
    </div>
  );
};

const StatCard = ({ icon, title, value, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm">
    <div className={`rounded-full w-12 h-12 flex items-center justify-center text-xl ${color}`}>
      {icon}
    </div>
    <p className="mt-4 text-gray-500">{title}</p>
    <h1 className="text-2xl font-bold text-gray-800">
      {typeof value === 'number' ? value : value || <Loader />}
    </h1>
  </div>
);

export default AdminDashboard;



// import Chart from "react-apexcharts";
// import { useGetUsersQuery } from "../../redux/api/usersApiSlice";
// import {
//   useGetTotalOrdersQuery,
//   useGetTotalSalesByDateQuery,
//   useGetTotalSalesQuery,
// } from "../../redux/api/orderApiSlice";

// import { useState, useEffect } from "react";
// import AdminMenu from "./AdminMenu";
// import OrderList from "./OrderList";
// import Loader from "../../components/Loader";

// const AdminDashboard = () => {
//   const { data: sales, isLoading } = useGetTotalSalesQuery();
//   const { data: customers, isLoading: loading } = useGetUsersQuery();
//   const { data: orders, isLoading: loadingTwo } = useGetTotalOrdersQuery();
//   const { data: salesDetail } = useGetTotalSalesByDateQuery();

//   const [state, setState] = useState({
//     options: {
//       chart: {
//         type: "line",
//       },
//       tooltip: {
//         theme: "dark",
//       },
//       colors: ["#00E396"],
//       dataLabels: {
//         enabled: true,
//       },
//       stroke: {
//         curve: "smooth",
//       },
//       title: {
//         text: "Sales Trend",
//         align: "left",
//       },
//       grid: {
//         borderColor: "#ccc",
//       },
//       markers: {
//         size: 1,
//       },
//       xaxis: {
//         categories: [],
//         title: {
//           text: "Date",
//         },
//       },
//       yaxis: {
//         title: {
//           text: "Sales",
//         },
//         min: 0,
//       },
//       legend: {
//         position: "top",
//         horizontalAlign: "right",
//         floating: true,
//         offsetY: -25,
//         offsetX: -5,
//       },
//     },
//     series: [{ name: "Sales", data: [] }],
//   });

//   useEffect(() => {
//     if (salesDetail) {
//       const formattedSalesDate = salesDetail.map((item) => ({
//         x: item._id,
//         y: item.totalSales,
//       }));

//       setState((prevState) => ({
//         ...prevState,
//         options: {
//           ...prevState.options,
//           xaxis: {
//             categories: formattedSalesDate.map((item) => item.x),
//           },
//         },

//         series: [
//           { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
//         ],
//       }));
//     }
//   }, [salesDetail]);

//   return (
//     <>
//       <AdminMenu />

//       <section className="xl:ml-[4rem] md:ml-[0rem]">
//         <div className="w-[80%] flex justify-around flex-wrap">
//           <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
//             <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
//               $
//             </div>

//             <p className="mt-5">Sales</p>
//             <h1 className="text-xl font-bold">
//               $ {isLoading ? <Loader /> : sales.totalSales.toFixed(2)}
//             </h1>
//           </div>
//           <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
//             <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
//               $
//             </div>

//             <p className="mt-5">Customers</p>
//             <h1 className="text-xl font-bold">
//               $ {isLoading ? <Loader /> : customers?.length}
//             </h1>
//           </div>
//           <div className="rounded-lg bg-black p-5 w-[20rem] mt-5">
//             <div className="font-bold rounded-full w-[3rem] bg-pink-500 text-center p-3">
//               $
//             </div>

//             <p className="mt-5">All Orders</p>
//             <h1 className="text-xl font-bold">
//               $ {isLoading ? <Loader /> : orders?.totalOrders}
//             </h1>
//           </div>
//         </div>

//         <div className="ml-[10rem] mt-[4rem]">
//           <Chart
//             options={state.options}
//             series={state.series}
//             type="bar"
//             width="70%"
//           />
//         </div>

//         <div className="mt-[4rem]">
//           <OrderList />
//         </div>
//       </section>
//     </>
//   );
// };

// export default AdminDashboard;
