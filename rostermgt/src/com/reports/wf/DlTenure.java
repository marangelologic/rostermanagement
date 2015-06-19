package com.reports.wf;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sun.el.parser.ParseException;

import jxl.Workbook;
import jxl.write.DateFormat;
import jxl.write.DateTime;
import jxl.write.Label;
import jxl.write.WritableCell;
import jxl.write.WritableCellFormat;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;

/**
 * Servlet implementation class DlTenure
 */
@WebServlet("/DlTenure")
public class DlTenure extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public DlTenure() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		WritableCell cell = null;
		WritableCellFormat cf = null;
		Connection conn = null;
		WritableWorkbook w = Workbook.createWorkbook(response
				.getOutputStream());

		try {
			conn = DriverManager.getConnection(
					"jdbc:postgresql://10.91.22.235:5432/reporting",
					"postgres", "P0stgres");

			Statement st = conn.createStatement();

			StringBuilder sb = new StringBuilder();
			sb.append("select a.emp_name,a.emp_id,c.tm_name,d.wg_names,emp_hired_date, ");
			sb.append("(CAST(DATE_PART('day', current_date::timestamp - to_date(emp_hired_date,'yyyy-mm-dd')::timestamp) AS INT)/30) as \"months\",");
			sb.append("(CAST(DATE_PART('day', current_date::timestamp - to_date(emp_hired_date,'yyyy-mm-dd')::timestamp) AS INT)/365) as \"years\"  from ");
			sb.append(" hdpr.tbl_roster_employees a ");
			sb.append(" INNER JOIN hdpr.tbl_roster_emp_tm_mapping b ON a.emp_id = b.emp_id AND is_current_tm = '1' ");
			sb.append(" INNER JOIN hdpr.tbl_roster_tm_mapping c ON b.tm_id = c.tm_employee_id ");
			sb.append(" INNER JOIN hdpr.tbl_roster_emp_wg_mapping d ON a.emp_id = d.emp_id AND is_current ='1'  ORDER BY months DESC");


			ResultSet allwg = st.executeQuery(sb.toString());

			response.setContentType("application/vnd.ms-excel");
			response.setHeader("Content-Disposition",
					"attachment; filename=Tenure_data.xls");
			
			WritableSheet s = w.createSheet("Tenure Data", 0);
			WritableCellFormat cellFormat = new jxl.write.WritableCellFormat(
					new jxl.write.DateFormat("MM/dd/yyyy"));
			
			int counter = 1;
			s.addCell(new Label(0, 0, "Employee ID"));
			s.addCell(new Label(1, 0, "Employee Name"));
			s.addCell(new Label(2, 0, "Manager"));
			s.addCell(new Label(3, 0, "Work Group"));
			s.addCell(new Label(4, 0, "Hire Date"));
			s.addCell(new Label(5, 0, "Month/s"));
			s.addCell(new Label(6, 0, "Year/s"));

			while (allwg.next()) {
				s.addCell(new Label(0, counter, allwg.getString("emp_id")));
				s.addCell(new Label(1, counter, allwg
						.getString("emp_name")));
				s.addCell(new Label(2, counter, allwg
						.getString("tm_name")));
				s.addCell(new Label(3, counter, allwg
						.getString("wg_names")));  
				s.addCell(new DateTime(4, counter,allwg.getDate("emp_hired_date"),cellFormat));
				s.addCell(new Label(5, counter, allwg.getString("months")));
				s.addCell(new Label(6, counter, allwg.getString("years")));

				counter++;
			}

			w.write();
			w.close();
		} catch (NullPointerException g) {

		} catch (WriteException ex) {
			Logger.getLogger(DlAllEmployee.class.getName()).log(Level.SEVERE,
					null, ex);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			try {
				if (conn != null) {
					conn.close();
				}
				if(w != null){
					w.close();
				}
			} catch (SQLException ex) {
				Logger.getLogger(DlAllEmployee.class.getName()).log(
						Level.SEVERE, null, ex);
			} catch (WriteException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			response.setContentType("text/html");
			
		}
	}
}
