var holders = function()
{
	var holder = [];
	
	this.add = function(input)
	{
		holder.push(input)
	}
	
	this.show = function()
	{
		
		return(holder.slice(0))
	}
}

Transaktioner = new holders();

var Konto = function(id, saldo, ejer, rentefod)
{
	if(typeof(id) == "number", typeof(saldo) == "number", typeof(ejer) == "string")
	{
		var that = {}
		
		var id = id;
		var saldo = saldo;
		var ejer = ejer;
		var rentefod = rentefod;
		
		Object.defineProperty
		(
			that, "saldo", 
			{
				"get": function()
				{
					return(saldo)
				}
//				"set": function(tilId, belob)
//				{
//					if(typeof(TilId) == "number" && typeof(belob) == "number")
//					{
//						if(saldo >= belob)
//						{
//							saldo = saldo - belob
//							Transaktioner.add({"fra":id, "til": tilId, "belob": belob})
//						}
//						else{throw("ikke nok på saldoen")}
//					}
//					else{throw("fejl ved id'et eller beløbet")}
//				}
			}
		);
		Object.defineProperty
		(
			that, "id",
			{
				"get":function()
				{
					return(id)
				}
			}
		)
		
		that.udtraek = function(belob)
		{
			if(typeof(belob) == "number" && that.validerUdtraek(belob))
			{
				saldo = saldo - belob;
			}
		}
		
		that.indsaet = function(belob)
		{
			if(typeof(belob) == "number" && that.validerIndaet(belob))
			{
				saldo = saldo + belob
			}
		}
		
		that.validerUdtraek = function(belob)
		{
			if(saldo >= belob)
			{
				return(true)
			}
			else{return(false)}
		}
		
		that.validerIndaet = function()
		{
			return(true)
		}
	}
	else{throw("Fejl i enten id'et eller saldo'en eller ejer")}
	
	return(that)
}

var Transaktion = function(fraKonto, tilKonto, belob, teller)
{
	if(typeof(fraKonto) == "object" && typeof(tilKonto) == "object" && typeof(belob) == "number" && typeof(teller) == "object")
	{
		var that = {}
	
		var fraKonto = fraKonto
		var tilKonto = tilKonto
		var belob = belob
		var teller = teller
		
		var erBrugt = false
		
		that.udfor = function()
		{
			if(that.valider() == true && erBrugt == false)
			{
				fraKonto.udtraek(belob)
				tilKonto.indsaet(belob)
				Transaktioner.add({"fra": fraKonto.id, "til": tilKonto.id, "belob": belob, "teller": teller})
				erBrugt = true
				return("overførslen gik igemmen")
			}
			else{return("Kan ikke valider overførslen")}
		}
		that.valider = function()
		{
			if(fraKonto.validerUdtraek(belob) == true && tilKonto.validerIndaet(belob) == true)
			{
				return(true)
			}
			else{return(false)}
		}
		return(that)
	}
	else{throw("Fejl ved fra konten, til konten, beløbet eller telleren")}
}
